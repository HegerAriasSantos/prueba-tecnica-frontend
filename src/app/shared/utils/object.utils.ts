export class ObjectUtils {
  static updateFromPartial<T>(obj: T, partial: Partial<T>): T {
    return Object.assign({}, obj, partial);
  }
}
