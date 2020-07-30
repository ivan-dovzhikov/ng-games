import angular from 'angular';

interface Obj<V = any> {
  [prop: string]: V;
}

export const IntersectPipeName = 'intersect';

export const IntersectPipe = () => {
  function getIntersect(input: any[], match: any[]): [];
  function getIntersect(input: Obj[], match: Obj): Obj[];
  function getIntersect(input: any[] | Obj[], match: any[] | Obj) {
    if (
      !Array.isArray(input) ||
      !angular.isObject(match) ||
      (Array.isArray(match) && !match.length)
    ) {
      return input;
    }

    return input.filter(entity => {
      if (Array.isArray(match)) {
        return match.includes(entity);
      }

      return Object.entries(match).every(([field, compare]) => {
        const value = entity[field];

        if (Array.isArray(compare) && !compare.length) return true;

        if (Array.isArray(compare) && Array.isArray(value))
          return getIntersect(value, compare);

        if (Array.isArray(compare)) return compare.includes(value);

        if (Array.isArray(value)) return value.includes(compare);

        return compare === value;
      });
    });
  }

  return getIntersect;
};

//tests:

// const fn = IntersectPipe();
// console.log('should be: [1, 3]');
// console.dir(fn([1, 2, 3], [1, 3]));
// console.log('should be: []');
// console.dir(fn([1, 2, 3], [4]));
// console.log('should be: [{name: 1}]');
// console.dir(fn([{ name: 1 }, { name: 2 }], { name: 1 }));
// console.log('should be: []');
// console.dir(fn([{ name: 1 }, { name: 2 }], { name: 3 }));
// console.log('should be: [{name: 2}, {name: 3}]');
// console.dir(fn([{ name: 1 }, { name: 2 }, { name: 3 }], { name: [2, 3] }));
// console.log("should be: [{name: 'den', age: 10}]");
// console.dir(
//   fn(
//     [
//       { name: 'sam', age: 20 },
//       { name: 'den', age: 10 },
//       { name: 'bem', age: 32 },
//     ],
//     { name: 'den', age: 10 }
//   )
// );
// console.log("should be: [{name: 'bem', age: 32}]");
// console.dir(
//   fn(
//     [
//       { name: 'sam', age: 20 },
//       { name: 'den', age: 10 },
//       { name: 'bem', age: 32 },
//     ],
//     { name: ['den', 'bem'], age: [32, 20] }
//   )
// );
// console.log("should be: [{name: 'den', age: 10}, {name: 'jem', age: 40}]");
// console.dir(
//   fn(
//     [
//       { name: 'sam', friends: ['jem'] },
//       { name: 'den', friends: ['bem'] },
//       { name: 'bem', friends: ['den', 'jem'] },
//       { name: 'jem', friends: ['bem', 'sam'] },
//     ],
//     { name: ['den', 'den', 'jem'], friends: ['jem', 'den'] }
//   )
// );
