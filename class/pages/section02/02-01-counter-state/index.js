import { useState } from "react";

export default function CounterLetDocumentPage() {
  // let count = 0 // let은 리액트 전용 html 에서 변경을 감지하지 못함 => 따라서 state 사용해야 함
  const [count, setCount] = useState(0);

  function onClickCountUp() {
    setCount(count + 1);
  }

  function onClickCountDown() {
    setCount(count - 1);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
      <button onClick={onClickCountDown}>카운트 내리기</button>
    </div>
  );
}
