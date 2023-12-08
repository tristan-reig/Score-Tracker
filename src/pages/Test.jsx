import { useEffect, useState } from 'react';

const Test = () => {
  const [variableJs, setVariableJs] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setVariableJs(data.variable_python);
      })
      .catch(error => console.error('Erreur de requête API:', error));
  }, []);

  console.log(variableJs)

  return (
    <div>{variableJs}</div>
  )
}

export default Test