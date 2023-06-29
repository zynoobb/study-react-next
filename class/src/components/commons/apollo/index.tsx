import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";

// inmemory cash
const GLOBAL_STATE = new InMemoryCache();
interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // next 렌더링 방식에 따라 해당 설정은 반영되지 않음 => 따라서 조건문 OR Hydration 이후 useEffect 사용
  // if (process.browser) {
  //   // 브라우저가 살아있는지 확인 1. 프리랜더링 예제 - process.browser
  //   console.log("지금은 브라우저.");
  //   const result = localStorage.getItem("accessToken");
  //   console.log(result);
  //   setAccessToken(result ?? "");
  // } else {
  //   console.log("지금은 프론트엔드 서버.");
  // }
  // 2. 프리랜더링 예제 - typeof window
  // if (typeof window !== "undefined") {
  //   console.log("지금은 브라우저.2");
  // } else {
  //   console.log("프론트엔드 서버2");
  // }

  useEffect(() => {
    console.log("UseEffect browser");
    const result = localStorage.getItem("accessToken");
    setAccessToken(result ?? "");
  }, []);

  const client = new ApolloClient({
    // uri: "http://backend-example.codebootcamp.co.kr/graphql",
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` }, // 헤더에 자동으로 토큰 추가하여 사용.
    cache: GLOBAL_STATE, // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해놓기 => 나중에 더 자세히 알아보기
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
