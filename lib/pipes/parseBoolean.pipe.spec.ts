import { ParseBooleanPipe } from './parseBoolean.pipe';

describe('ParseBooleanPipe', () => {
  it('Should parse the given string as boolean (true)', () => expect(ParseBooleanPipe('true')).toStrictEqual(true));

  it('Should parse the given string as boolean (false)', () => expect(ParseBooleanPipe('false')).toStrictEqual(false));

  it('Should return the given string as string', () => expect(ParseBooleanPipe('test')).toStrictEqual('test'));
});
