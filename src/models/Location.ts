import {User} from "./User";
import {Group} from "./Group";

export interface ExpiresIn {
  hours: number
  minutes: number
}

class Location {
  constructor(
    readonly uuid: string | null,
    readonly user: User,
    readonly group: Group,
    readonly latitude: number,
    readonly longitude: number,
    readonly expiresAt: Date
  ) {
  }

  public expiresIn(currentTime: Date = new Date()): ExpiresIn {
    let timeDifference = this.expiresAt.getTime() - currentTime.getTime();

    let hours = Math.trunc(timeDifference / 3600000);
    timeDifference -= hours * 3600000;

    let minutes = Math.ceil(timeDifference / 60000);

    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }

    return {hours, minutes};
  }

  public static fromJson(json: any): Location {
    return new Location(
      json.uuid,
      User.fromJson(json.user),
      Group.fromJson(json.group),
      json.latitude,
      json.longitude,
      new Date(json.expiresAt)
    );
  }
}

export default Location;