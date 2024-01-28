import { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/4197/league")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  if (data) {
    console.log(data)
  }

  return (
    <div>Test</div>
  );
}

export default Test;