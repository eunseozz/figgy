import useUserStore from "@/stores/useUserStore";

export const fetcher = async (url) => {
  const accessToken = useUserStore.getState().accessToken;

  const response = await fetch(url, {
    headers: {
      "X-FIGMA-TOKEN": accessToken,
    },
  });

  if (!response.ok) {
    const errorMessage = `Figma 요청 실패: ${response.status} ${response.statusText}`;

    throw new Error(errorMessage);
  }

  const data = await response.json();

  return data;
};
