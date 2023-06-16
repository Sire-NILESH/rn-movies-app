interface NSFWContentPermission {
  nsfw: boolean;
}

// Define the initial state using that type
export const nsfwSettingInitialState: NSFWContentPermission = {
  nsfw: false,
};
