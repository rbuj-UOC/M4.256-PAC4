import { DuplicatePipe } from './duplicate.pipe';

describe('DuplicatePipe', () => {
  // declaramos la variable pipe de tipo DuplicatePipe
  let pipe: DuplicatePipe;

  // antes de cada test instanciamos la variable pipe
  beforeEach(() => {
    pipe = new DuplicatePipe();
  });

  // Test 1, que se cree el pipe correctamente
  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  // Test 2, que se obtenga el resultado esperado
  it(' duplicate pipe success', () => {
    const number = 4;
    const result = pipe.transform(number);
    expect(result).toBe(8);
  });
});
