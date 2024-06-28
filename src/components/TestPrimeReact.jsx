import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function TestPrimeReact() {
  return (
    <div className="card">
      <Card title="Simple Card">
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </Card>
      <Button label="Submit" icon="pi pi-check" className="mt-2" />
    </div>
  );
}
