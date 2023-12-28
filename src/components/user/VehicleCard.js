import carimage from "./car.jpg";
export default function VehicleCard(props) {
  //   const carCount = props.data.length;
  const carElements = props.data.map((car) => (
    <div className="row border border-dark rounded m-4">
      <div key={car} className="col">
        <div className="m-4">
          <span className="display-6">{car.Company + " "}</span>
          <span className="display-6">{car.Model}</span>
          <div>
            <br />
            <div className="display-6">{car.VehicleNumber}</div>
            <br />
            <div className="display-6">{car.FuelType}</div>
          </div>
        </div>
      </div>
      <div className="col">
        <img
          className="img-fluid"
          src={carimage}
          alt="Car"
          style={{ width: "500px", height: "auto" }}
        />
      </div>
    </div>
  ));

  return <div>{carElements}</div>;
}
