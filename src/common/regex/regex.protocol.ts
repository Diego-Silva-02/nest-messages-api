export interface RegexProtocol {
    // This method don't have body because it's in a abstract class (before it's a abstract class)
    execute(str: string): string;
}