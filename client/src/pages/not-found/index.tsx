import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ErrorLayout } from "@/layout/error";
import i18n from "@/localization/i18n.json"


export function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<ErrorLayout>
			<Container size="sm" py="xl" style={{ textAlign: "center" }}>
				<Stack gap="lg">
					<Title order={1} size="3rem" c="blue">
						{i18n.UI_TEXT.CODE_404}
					</Title>
					<Title order={2}>Page Not Found</Title>
					<Text size="lg" c="dimmed">
						{i18n.UI_TEXT.PAGE_NOT_FOUND}
					</Text>
					<Group justify="center" mt="xl">
						<Button size="md" onClick={() => navigate("/")}>
							{i18n.UI_TEXT.BACK_TO_HOME}
						</Button>
					</Group>
				</Stack>
			</Container>
		</ErrorLayout>
	);
}
