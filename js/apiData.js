console.log("공공데이터");
fetch("https://api.odcloud.kr/api/15052836/v1/uddi:2253111c-b6f3-45ad-9d66-924fd92dabd7?page=1&perPage=1000&serviceKey=99KIHGGjBmzaox6aET3NVVM1tdw5HU2mHUeFW%2BM6Fnl0BIDFW4%2FmH8dCaB4LR1tb0LsUAXePe1GHwhyu%2BZ%2FEBA%3D%3D")
    .then((res) => res.json())
    .then((data) => {
        // 로컬스토리지에 저장
        localStorage.setItem("addressArray", JSON.stringify(data));
        console.log(data);
    });