export interface IValidator<TInput> {
   validate(input: Partial<TInput>): never | void;
}
