import { ImageResponse } from 'next/og';

// Social sharing image template (1200x630), rendered at build time by the
// opengraph-image.js files. Only flexbox layout is supported by ImageResponse.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

// Shorten long text at a word boundary.
const clamp = (text, max) => {
    if (!text || text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.:;–-]+$/, '')}…`;
};

export function renderOgImage({ eyebrow, title, description, footer = 'Senior Software Developer · Mumbai' }) {
    const titleSize = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '64px 72px',
                    background: 'linear-gradient(135deg, #0b1220 0%, #111827 55%, #0c2a3d 100%)',
                    color: '#e5e7eb',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 56, height: 56, borderRadius: 28, border: '4px solid #1BA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1BA5E9', fontSize: 30, fontWeight: 700 }}>N</div>
                        <div style={{ marginLeft: 18, fontSize: 26, color: '#9ca3af' }}>nikhilvishwakarma.com</div>
                    </div>
                    {eyebrow && (
                        <div style={{ display: 'flex', padding: '8px 20px', borderRadius: 999, border: '2px solid #1BA5E9', color: '#38bdf8', fontSize: 22, letterSpacing: 2, textTransform: 'uppercase' }}>{clamp(eyebrow, 40)}</div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.15, color: '#f3f4f6', letterSpacing: -1 }}>{clamp(title, 110)}</div>
                    {description && (
                        <div style={{ display: 'flex', marginTop: 24, fontSize: 28, lineHeight: 1.4, color: '#9ca3af' }}>{clamp(description, 165)}</div>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', width: 64, height: 6, borderRadius: 3, background: '#1BA5E9', marginRight: 20 }} />
                        <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: '#e5e7eb' }}>Nikhil Vishwakarma</div>
                        <div style={{ display: 'flex', fontSize: 26, color: '#9ca3af', marginLeft: 16 }}>{footer}</div>
                    </div>
                </div>
            </div>
        ),
        { ...ogSize },
    );
}
