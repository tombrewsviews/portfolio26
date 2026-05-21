import { Composition, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

const IntroComp: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const wght = Math.round(interpolate(frame, [0, 60], [300, 900], { extrapolateRight: 'clamp' }));
  return (
    <AbsoluteFill style={{ background: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
      <span style={{ color: '#f4f4f2', fontSize: 120, fontFamily: 'Roboto Flex, sans-serif', opacity, fontVariationSettings: `"wght" ${wght}` }}>
        {title}
      </span>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ProjectIntro"
    component={IntroComp}
    durationInFrames={90}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ title: 'Adlook' }}
  />
);
