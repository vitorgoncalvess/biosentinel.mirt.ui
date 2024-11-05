import { Service } from "./service";

class ZoneService extends Service {
  constructor(url: string) {
    super(url);
  }

  async getZonesByUser() {
    try {
      const resp = await this.api(`/user`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.getToken(),
        },
      });

      const data = await resp.json();

      return this.resolve(resp.status, data);
    } catch (err) {}
  }
}

const zoneService = new ZoneService("/zone");

export default zoneService;
