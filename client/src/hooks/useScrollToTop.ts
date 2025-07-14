import { useEffect } from "react";

export default function useScrollToTop(page: number) {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [page]);
}
