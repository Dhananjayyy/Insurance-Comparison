import carimage1 from "./carimage.jpg";
export default function InsuranceProviders() {
  return (
    <div className="container text-center">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="img-fluid"
          src={carimage1}
          alt="Car"
          style={{ width: "500px", height: "auto" }}
        />
      </div>

      <div className="my-5">
        <h2>Insurance Provider Companies</h2>
      </div>
    </div>
  );
}
