import Location, {ExpiresIn} from "../../models/Location";
import {User} from "../../models/User";
import {Group} from "../../models/Group";

const classUser1 = new User('id1', 'John');
const classUser2 = new User('id2', 'Jane');
const classGroup = new Group(
  'uuid1',
  'group1',
  null,
  [classUser1, classUser2],
  [classUser2, classUser1]
);

describe("Location", () => {
  describe("fromJson", () => {
    it('returns correct Location object', () => {
      const jsonUser1 = {id: 'id1', name: 'John'}
      const jsonUser2 = {id: 'id2', name: 'Jane'}
      const jsonGroup = {
        uuid: 'uuid1',
        name: 'group1',
        description: null,
        users: [jsonUser1, jsonUser2],
        admins: [jsonUser2, jsonUser1]
      };
      const expireDate = new Date('2020-12-03T10:01:19.772');
      const locationFromJson = Location.fromJson({
          uuid: 'uuid2',
          group: jsonGroup,
          user: jsonUser1,
          latitude: 55.755826,
          longitude: 37.6173,
          expiresAt: expireDate.getTime(),
        }
      )

      const locationFromConstructor = new Location(
        'uuid2',
        classUser1,
        classGroup,
        55.755826,
        37.6173,
        expireDate
      )

      expect(locationFromJson).toEqual(locationFromConstructor);
    });
  });

  describe("expiresIn", () => {
    it('with given date returns correct ExpiresIn object', () => {
      const currentDate = new Date('2020-12-03T23:20:00.000Z');
      const sharedDate = new Date('2020-12-04T02:19:00.001Z');
      const expectedExpiresIn: ExpiresIn = {
        hours: 3,
        minutes: 0
      }

      const location = new Location('id1', classUser1, classGroup, 12.12, 12.12, sharedDate);
      const actualExpiresIn = location.expiresIn(currentDate);

      expect(actualExpiresIn).toEqual(expectedExpiresIn);
    });

    it('with default date returns correct ExpiresIn object', () => {
      const expectedExpiresIn: ExpiresIn = {hours: 0, minutes: 0}

      const location = new Location('id1', classUser1, classGroup, 12.12, 12.12, new Date());
      const actualExpiresIn = location.expiresIn();

      expect(actualExpiresIn).toEqual(expectedExpiresIn);
    });
  });
});