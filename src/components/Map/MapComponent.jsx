import { useEffect, useRef, useState } from "react";
const { naver } = window;

const handleGeocoder = ({ address }, callback) => {
  naver.maps.Service.geocode(
    {
      query: address,
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        alert("Something wrong!");
        return;
      }

      var result = response.v2,
        items = result.addresses;

      callback(items);
    }
  );
};

const MapNaverDefault = ({ address }) => {
  const mapElement = useRef(null);
  const [coordinates, setCoordinates] = useState({ x: null, y: null });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // handleGeocoder 함수를 호출하여 address를 이용해 items 값을 가져옵니다.
        handleGeocoder({ address }, (items) => {
          // items 값을 받아 coordinates 상태를 업데이트합니다.
          setCoordinates({
            x: items[0].y, // 위도
            y: items[0].x, // 경도
          });
        });
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    if (!mapElement.current || !coordinates.x || !coordinates.y) return;

    // coordinates 상태를 이용하여 지도에 위치를 표시합니다.
    const { naver } = window;
    const location = new naver.maps.LatLng(coordinates.x, coordinates.y);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [coordinates]);

  return (
    <>
      <div ref={mapElement} style={{ minWidth: "900px", minHeight: "400px" }} />
    </>
  );
};

export default MapNaverDefault;
