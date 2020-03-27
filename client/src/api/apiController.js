// import axios from "axios";

export async function solveProblem() {
  //   const response = await axios.get(
  //     "http://127.0.0.1:5000/api/algorithms/simplex"
  //   );
  //   console.log(response.data);
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => resolve(JSON.parse(xhr.responseText)));

    xhr.open("GET", "http://127.0.0.1:5000/api/algorithms/simplex");
    xhr.send();
  });
}
