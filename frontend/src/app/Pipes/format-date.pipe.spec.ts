import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  // declaramos la variable pipe de tipo FormatDatePipe
  let pipe: FormatDatePipe;

  // antes de cada test instanciamos la variable pipe
  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  // Test 1, que se cree el pipe correctamente
  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  // Test 2, con una fecha dada y el argumento 1 devuelve el formato esperado
  it(' first data format', () => {
    const date = new Date('December 17, 2024 12:34:00');
    const result = pipe.transform(date, 1);
    expect(result).toBe('17122024');
  });

  // Test 3, con una fecha dada y el argumento 2 devuelve el formato esperado
  it(' second data format', () => {
    const date = new Date('December 17, 2024 12:34:00');
    const result = pipe.transform(date, 2);
    expect(result).toBe('17 / 12 / 2024');
  });

  // Test 4, con una fecha dada y el argumento 2 devuelve el formato esperado
  it(' third data format', () => {
    const date = new Date('December 17, 2024 12:34:00');
    const result = pipe.transform(date, 3);
    expect(result).toBe('17/12/2024');
  });

  // Test 5, con una fecha dada y el argumento 2 devuelve el formato esperado
  it(' fourth data format', () => {
    const date = new Date('December 17, 2024 12:34:00');
    const result = pipe.transform(date, 4);
    expect(result).toBe('2024-12-17');
  });
});
