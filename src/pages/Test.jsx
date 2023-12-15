import { useState, useEffect } from 'react';

function Test() {
  const [request, setRequest] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/clubs').then(res => res.json()).then(data => setRequest(data))
  }, []);

  if (request) {
    console.log(request[0])
  }

  return (
    <div>Test</div>
  );
}

export default Test;