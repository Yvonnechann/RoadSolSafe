# Profile Pictures Setup

## Overview
The app now supports custom profile pictures for users in the Leaderboard and Socials pages. Currently, the system uses fallback icons until the actual image files are added.

## Profile Picture Types
The following profile picture types are supported:
- `cat` - Cute orange cat with gradient background
- `robot` - Friendly robot with blue gradient background  
- `astronaut` - Astronaut with helmet and blue gradient background
- `fox` - Orange fox with pink gradient background
- `bear` - Light brown bear with orange background
- `penguin` - Penguin with light blue gradient background
- `fox2` - Fox variant with lavender-blue gradient background
- `rabbit` - White rabbit with purple gradient background

## Adding the Images

### Step 1: Create Image Files
Create the following image files in `src/assets/profile-pictures/`:
- `cat.png`
- `robot.png`
- `astronaut.png`
- `fox.png`
- `bear.png`
- `penguin.png`
- `fox2.png`
- `rabbit.png`

### Step 2: Update ProfilePicture Component
Once the images are added, update `src/components/ProfilePicture.tsx`:

```typescript
const profilePictures = {
  cat: require('../assets/profile-pictures/cat.png'),
  robot: require('../assets/profile-pictures/robot.png'),
  astronaut: require('../assets/profile-pictures/astronaut.png'),
  fox: require('../assets/profile-pictures/fox.png'),
  bear: require('../assets/profile-pictures/bear.png'),
  penguin: require('../assets/profile-pictures/penguin.png'),
  fox2: require('../assets/profile-pictures/fox2.png'),
  rabbit: require('../assets/profile-pictures/rabbit.png'),
};

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  type, 
  size = 40, 
  style 
}) => {
  const imageSource = profilePictures[type];
  
  if (!imageSource) {
    // Fallback to default icon if image not found
    return (
      <View style={[styles.container, { width: size, height: size }, style]}>
        <Ionicons name="person" size={size * 0.6} color={theme.colors.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image 
        source={imageSource} 
        style={[styles.image, { width: size, height: size }]}
        resizeMode="cover"
      />
    </View>
  );
};
```

## Current Implementation
- **LeaderboardScreen**: All users have character assignments
- **SocialsScreen**: All friends have character assignments
- **Fallback**: Shows person icon until images are added
- **Styling**: Circular avatars with proper shadows and borders

## Image Requirements
- **Format**: PNG with transparency support
- **Size**: Square aspect ratio recommended
- **Resolution**: At least 100x100px for quality
- **Background**: Should be transparent or match app theme
