async function fetchData(
  text = "",
  source_language = "en",
  target_language = "zh"
) {
  if (text.length > 10000) {
    alert("max text is 9999 characters");
    return;
  }
  if (keyEl.value === "") {
    alert("Please input your X-RapidAPI-Key first.");
    return;
  }
  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", source_language);
  encodedParams.append("target_language", target_language);
  encodedParams.append("text", text);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": keyEl.value,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: encodedParams,
  };

  try {
    const res = await fetch(
      "https://text-translator2.p.rapidapi.com/translate",
      options
    );
    const record = await res.json();
    if (!record.data) {
      localStorage.removeItem("key");
      resultEl.classList.add("error");
      return record.message;
    }
    localStorage.setItem("key", keyEl.value);
    resultEl.classList.add("success");
    return record.data.translatedText;
  } catch (error) {
    return error.toString();
  }
}
const keyEl = document.querySelector("#key");
const resultEl = document.querySelector("#result");
const textEl = document.querySelector("#text");
const submitEl = document.querySelector("#submit");

keyEl.value = localStorage.getItem("key") || "";

submitEl.addEventListener(
  "click",
  async function () {
    resultEl.classList.className = "";
    resultEl.innerHTML = "requesting server, please wait...";
    const data = await fetchData(textEl.value);
    resultEl.innerHTML = data;
  },
  false
);
