import { AvatarGenerator } from 'random-avatar-generator';

const generator = new AvatarGenerator()

export const generateAvatarByEmail = (email) => generator.generateRandomAvatar(email)