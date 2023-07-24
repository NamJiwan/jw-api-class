let city;

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
city = params.get("city");
city = city ? city : "대구광역시";


var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  


// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 로컬스토리지 저장된 불러오기
const storageData = localStorage.getItem("addressArray");
// 저장된 글자를 객체로 변환
const parsedData = JSON.parse(storageData);
// console.log(parsedData.data[0].소재지도로명주소);


const dataDaegu = parsedData.data.filter(item => 
    item.소재지도로명주소.includes(city)
);
console.log(dataDaegu);

// 주소 확인용
// const ADDRESS = [
//     {add: "대구광역시 동구 화랑로 525", title: "지도1"},
//     {add: "대구광역시 동구 동촌로 370", title: "지도2"},
//     {add: "대구광역시 동구 화랑로80길 23", title: "지도3"},
// ]

dataDaegu.map((item)=>{
    // 주소로 좌표를 검색합니다
geocoder.addressSearch(item.소재지도로명주소, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: `
                <div class="flex flex-col text-neutral-400 space-y-0 p-2">
                    <div class="text-[10px]">${item.시장명}</div>
                    <div class="text-[9px]">${item.소재지도로명주소.replace(city,"")}</div>
                </div>
            `
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(new kakao.maps.LatLng(35.875571,128.681478));
    } 
});    
})
