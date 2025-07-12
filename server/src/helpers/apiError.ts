import { API_ERRORS, HTTP_STATUS_CODES } from './consts';

interface ApiErrorBody {
  code: string;
  message?: string;
  description?: any[];
}

export enum ApiErrorType {
  WordSynonymsPairEqual = 'WordSynonymsPairEqual',
  InternalServerError = 'InternalServerError',
}

export class ApiError extends Error {
  public error: Error;
  public body: ApiErrorBody;
  public httpStatusCode: number;
  public type: ApiErrorType;
  private codePrefix: string;

  constructor(
    type: ApiErrorType,
    error: Error,
    codePrefix = '01',
    ...params: any[]
  ) {
    super(...params);

    this.codePrefix = codePrefix;
    this.error = error;
    this.type = type;
    const { body, httpStatusCode } = (this.error as any).errors
      ? this.createValidationErrorData((this.error as any).errors)
      : this.createServiceErrorData(this.type);

    this.body = body;
    this.httpStatusCode = httpStatusCode;
  }

  private createValidationErrorData(errors: any[]) {
    return {
      body: {
        code: `${this.codePrefix}-400-01`,
        description: errors,
      },
      httpStatusCode: HTTP_STATUS_CODES.BAD_REQUEST,
    };
  }

  private createServiceErrorData(type: ApiErrorType) {
    switch (type) {
      case ApiErrorType.WordSynonymsPairEqual:
        return {
          body: {
            code: `${this.codePrefix}-400-01`,
            message: API_ERRORS.WORD_SYNONYMS_PAIR_EQUAL,
          },
          httpStatusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        };
      case ApiErrorType.InternalServerError:
      default:
        return {
          body: {
            code: `${this.codePrefix}-500-01`,
            message: API_ERRORS.INTERNAL_SERVER_ERROR,
          },
          httpStatusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        };
    }
  }
}
