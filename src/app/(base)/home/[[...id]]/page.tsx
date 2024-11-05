import zoneService from "@/services/zone-service";
import React from "react";

const Page = async ({ params }) => {
  const zones = await zoneService.getZonesByUser();
  const zone = zones?.data.find((z) => z.id === params.id) || zones?.data[0];

  console.log(zone);

  return (
    <div className="flex p-4 gap-4">
      <section className="grow">
        <div className=""></div>
      </section>
      <ul className="w-[400px]"></ul>
    </div>
  );
};

export default Page;
