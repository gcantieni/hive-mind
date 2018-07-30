import { Bee } from './bee.js';


test('Bee position setting', () => {
    const myBee = new Bee(10, 10, new Map());
    expect(myBee.x).toBe(10);
    expect(myBee.y).toBe(10);
});