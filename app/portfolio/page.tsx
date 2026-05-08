'use client';

import { useState, useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { 
  useScrollAnimation, 
  scrollAnimationVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from '../hooks/useScrollAnimation';

interface PortfolioItem {
  id: string | number;
  category: string;
  album: string;
  title: string;
  client: string;
  image: string;
  videoUrl?: string;
}

interface Album {
  name: string;
  items: PortfolioItem[];
  number?: number;
  company?: string;
  slug: string;
}

const defaultPortfolioItems: PortfolioItem[] = [
  { id: 1, category: 'Photos', album: 'Christmas', title: 'Snowy Editorial', client: 'Elegance Co.', image: '/images/album03-basilur-christmas-01.jpg' },
  { id: 2, category: 'Photos', album: 'Fashion', title: 'Tech Product Launch', client: 'Innovation Labs', image: '/images/album10-winter-studio-01.jpg' },
  { id: 3, category: 'Photos', album: 'Architecture', title: 'Modern Architecture Series', client: 'Urban Spaces', image: '/images/album06-martex-corporate-01.jpg' },
  { id: 4, category: 'Design', album: 'Brand Refresh', title: 'Beauty Brand Refresh', client: 'Radiance Cosmetics', image: '/images/design_1.jpg' },
  { id: 5, category: 'Photos', album: 'Fashion', title: 'Editorial Fashion Story', client: 'Vogue Magazine', image: '/images/album09-winter-classic-01.jpg' },
  { id: 6, category: 'Videos', album: 'Campaigns', title: 'Luxury Watch Campaign', client: 'Timepiece Co.', image: '/images/video_1.jpg', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 7, category: 'Photos', album: 'Commercial', title: 'Commercial Product Series', client: 'Various Clients', image: '/images/album01-basilur-autumn-tea-01.jpg' },
  { id: 8, category: 'Projects', album: 'Identity Systems', title: 'Brand Identity System', client: 'StartUp Inc.', image: '/images/album07-tripson-product-01.jpg' },
  { id: 9, category: 'Digitals', album: 'Social', title: 'Social Media Campaign', client: 'Lifestyle Brand', image: '/images/design_2.jpg' },
  { id: 10, category: 'Design', album: 'Packaging', title: 'Packaging Design Series', client: 'Gourmet Goods', image: '/images/design_3.jpg' },
  { id: 11, category: 'Photos', album: 'Christmas', title: 'Holiday Lights', client: 'Local Shop', image: '/images/album03-basilur-christmas-02.jpg' },
  { id: 12, category: 'Photos', album: 'Fashion', title: 'Runway Series', client: 'Vogue Magazine', image: '/images/album08-winter-christmas-01.jpg' },
];

const defaultCategories = ['Photos', 'Videos', 'Design', 'Projects', 'Digitals'];

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultPortfolioItems);
  const categories = useMemo(() => Array.from(new Set(portfolioItems.map((p) => p.category))), [portfolioItems]);

  const [activeCategory, setActiveCategory] = useState<string>(defaultCategories[0]);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<PortfolioItem | null>(null);

  const [videoCards, setVideoCards] = useState<PortfolioItem[]>(() => [
    { id: 'video-01', category: 'Videos', album: 'Videos', title: 'Martex Visuals', client: 'Martex MFG (Pvt) Ltd', image: '/images/video_1.jpg', videoUrl: 'https://www.youtube.com/watch?embeds_referring_euri=https%3A%2F%2Fpasindusahan.com%2F&source_ve_path=Mjg2NjQsMTY0NTAz&v=MsoBTxHMw18&feature=youtu.be' },
    { id: 'video-02', category: 'Videos', album: 'Videos', title: 'Outdoor Shoot', client: 'Winter Collection', image: '/images/video_2.jpg', videoUrl: 'https://www.youtube.com/shorts/WhNaqAWp66k' },
    { id: 'video-03', category: 'Videos', album: 'Videos', title: 'Dance Moves', client: 'Winter Collection', image: '/images/video_3.jpg', videoUrl: 'https://www.youtube.com/watch?v=Aw4NQHstMxM' },
    { id: 'video-04', category: 'Videos', album: 'Videos', title: 'Commercial Shoot', client: 'Winter Collection', image: '/images/video_4.jpg', videoUrl: 'https://www.youtube.com/watch?v=L7Gml5dMPWI' },
    { id: 'video-05', category: 'Videos', album: 'Videos', title: 'Christmas Video', client: 'Winter Collection', image: '/images/video_5.jpg', videoUrl: 'https://youtube.com/shorts/CR4Q56tmyDU?feature=share' },
    { id: 'video-06', category: 'Videos', album: 'Videos', title: 'Studio Shoot 1', client: 'Winter Collection', image: '/images/video_6.jpg', videoUrl: 'https://www.youtube.com/shorts/xNJEw8xTqc8' },
    { id: 'video-07', category: 'Videos', album: 'Videos', title: 'Studio Shoot 2', client: 'Winter Collection', image: '/images/video_7.jpg', videoUrl: 'https://youtube.com/shorts/aOfP_mBvUHM?feature=share' },
  ]);

  const handleUpdateVideoTitle = (id: string | number, newTitle: string) => {
    setVideoCards((prev) => prev.map((v) => (v.id === id ? { ...v, title: newTitle } : v)));
  };

  const albums = useMemo(() => {
    const filtered = portfolioItems.filter((item) => item.category === activeCategory);
    
    if (activeCategory === 'Design') {
      const designs: PortfolioItem[] = [
        { id: 'design-01', category: 'Design', album: 'Designs', title: 'Kingsleaf – Product Leaflet', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_1.jpg' },
        { id: 'design-02', category: 'Design', album: 'Designs', title: 'Basilur – Christmas Sample Card Design', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_2.jpg' },
        { id: 'design-03', category: 'Design', album: 'Designs', title: 'Golden Legacy – Booklet', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_3.jpg' },
        { id: 'design-04', category: 'Design', album: 'Designs', title: 'Artisan Range – Booklet', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_4.jpg' },
        { id: 'design-05', category: 'Design', album: 'Designs', title: 'Golden Harvest – Booklet', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_5.jpg' },
        { id: 'design-06', category: 'Design', album: 'Designs', title: 'Tea of the Year – Booklet', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_6.jpg' },
        { id: 'design-07', category: 'Design', album: 'Designs', title: 'Basilur – Gondola Design', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_7.jpg' },
        { id: 'design-08', category: 'Design', album: 'Designs', title: 'Golden Needles – Product Cover', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_8.jpg' },
        { id: 'design-09', category: 'Design', album: 'Designs', title: 'Rise of the Dragon', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_9.jpg' },
        { id: 'design-10', category: 'Design', album: 'Designs', title: 'Fadna Hasthi – Product Cover', client: 'Fadna Tea (Pvt) Ltd', image: '/images/design_10.jpg' },
        { id: 'design-11', category: 'Design', album: 'Designs', title: 'Tipson – Sample Card Design', client: 'Tipson Tea Sri Lanka', image: '/images/design_11.jpg' },
        { id: 'design-12', category: 'Design', album: 'Designs', title: 'Tipson Tea – Product Leaflet', client: 'Tipson Tea Sri Lanka', image: '/images/design_12.jpg' },
        { id: 'design-13', category: 'Design', album: 'Designs', title: 'Gap – Magazine Cover', client: 'Martex MFG (Pvt) Ltd', image: '/images/design_13.jpg' },
        { id: 'design-14', category: 'Design', album: 'Designs', title: 'Organsia – Product Box Design', client: 'Organsia', image: '/images/design_14.jpg' },
        { id: 'design-15', category: 'Design', album: 'Designs', title: 'Basilur Tea – Product Leaflet', client: 'Basilur Tea Exports (Pvt) Ltd', image: '/images/design_15.jpg' },
      ];
      return [{ name: 'Designs', items: designs, number: 0, company: '', slug: 'designs' }];
    }

    if (activeCategory === 'Photos') {
      const photoAlbums = [
        { num: 1, name: 'Basilur Autumn Tea', company: 'Basilur Tea Exports (Pvt) Ltd', slug: 'basilur-autumn-tea', count: 2 },
        { num: 2, name: 'Basilur Corporate Gift Shoot', company: 'Basilur Tea Exports (Pvt) Ltd', slug: 'basilur-corporate-gift', count: 4 },
        { num: 3, name: 'Basilur Christmas Shoot', company: 'Basilur Tea Exports (Pvt) Ltd', slug: 'basilur-christmas', count: 2 },
        { num: 4, name: 'Basilur Island of Tea Shoot', company: 'Basilur Tea Exports (Pvt) Ltd', slug: 'basilur-island-of-tea', count: 2 },
        { num: 5, name: 'Basilur Spring Shoot', company: 'Basilur Tea Exports (Pvt) Ltd', slug: 'basilur-spring', count: 4 },
        { num: 6, name: 'Martex Corporate Shoot', company: 'Martex MFG (Pvt) Ltd', slug: 'martex-corporate', count: 7 },
        { num: 7, name: 'Tripson Product Shoot', company: 'Tipson', slug: 'tripson-product', count: 2 },
        { num: 8, name: 'Winter Christmas Shoot', company: 'Winter Collection', slug: 'winter-christmas', count: 7 },
        { num: 9, name: 'Winter Classic Shoot', company: 'Winter Collection', slug: 'winter-classic', count: 10 },
        { num: 10, name: 'Winter Studio Shoots', company: 'Winter Collection', slug: 'winter-studio', count: 5 },
      ];

      return photoAlbums.map((a): Album => {
        const name = a.name;
        const slugSource = a.slug || name;
        const slug = String(slugSource).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
        const items = Array.from({ length: a.count }).map((_, ci): PortfolioItem => ({
          id: `photos-${a.num}-${ci + 1}`,
          category: 'Photos',
          album: name,
          title: `${name} ${ci + 1}`, 
          client: a.company || '',
          image: `/images/album${String(a.num).padStart(2, '0')}-${slug}-${String(ci + 1).padStart(2,'0')}.jpg`,
        }));
        return { name, items, number: a.num, company: a.company, slug };
      });
    }

    if (activeCategory === 'Videos') {
      return [{ name: 'Videos', items: videoCards, number: 0, company: '', slug: 'videos' }] as Album[];
    }

    return filtered.map((item, idx): Album => {
      const name = item.album || item.title;
      const slug = String(name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
      return {
        name,
        company: item.client || '',
        slug,
        items: [item],
      };
    });
  }, [activeCategory, videoCards]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search || '');
    const albumParam = searchParams.get('album');
    if (!albumParam) return;
    const found = albums.find((al) => al.slug === albumParam || al.name.toLowerCase().replace(/[^a-z0-9]+/g,'-') === albumParam);
    if (found) {
      setActiveAlbum(found);
      setIsAlbumOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [albums]);

  const { ref: filterRef, isInView: filterInView } = useScrollAnimation();
  const { ref: gridRef } = useScrollAnimation();

  return (
    <div style={styles.portfolioPage} className="portfolio-page">
      {/* Header Section */}
      <section style={styles.header}>
        <div style={styles.heroImageWrapper} aria-hidden="true" />
        <div style={styles.heroImageOverlay} aria-hidden="true" />

        <div style={styles.headerContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 style={styles.heading}>
              Our <span style={styles.gradient}>Creative Work</span>
            </h1>
            <p style={styles.subtitle}>
              A showcase of our most impactful projects across branding, photography, video, and digital campaigns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section style={styles.filterSection} ref={filterRef} className="portfolio-filter-section">
        <motion.div
          style={styles.filterButtons}
          className="portfolio-filter-buttons"
          initial="hidden"
          animate={filterInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              style={{
                ...styles.filterBtn,
                ...(activeCategory === category ? styles.filterBtnActive : {})
              }}
              className={`filter-btn-hover portfolio-filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => { setActiveCategory(category); setIsAlbumOpen(false); setActiveAlbum(null); }}
              variants={staggerItemVariants}
            >
              {category}
            </motion.button>
            ))}
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      {!isAlbumOpen && (
        <section style={styles.portfolioGrid} ref={gridRef} key={activeCategory} className="portfolio-grid-section">
          {albums.length === 0 ? (
            <div style={{color:'#A0A0A0', textAlign:'center', padding:'48px 0', fontFamily: 'Cousine, monospace'}}>
              No work in this category yet.
            </div>
          ) : (
            <div style={styles.gridContainer} className="portfolio-grid-container">
              {(activeCategory === 'Design' || activeCategory === 'Videos') ? (
                albums[0].items.map((item) => (
                  <WorkCard
                    key={item.id}
                    item={item}
                    showText={true}
                    editable={activeCategory === 'Videos'}
                    onTitleChange={(newTitle) => { if (activeCategory === 'Videos') handleUpdateVideoTitle(item.id, newTitle); }}
                    onOpen={() => {
                      if (activeCategory === 'Videos' && item.videoUrl) {
                        window.open(item.videoUrl, '_blank');
                        return;
                      }
                      setActiveWork(item); setIsWorkOpen(true);
                    }}
                  />
                ))
              ) : (
                albums.map((album) => (
                  <AlbumCard 
                    key={album.name} 
                    album={album} 
                    onOpen={() => { setActiveAlbum(album); setIsAlbumOpen(true); }} 
                  />
                ))
              )}
            </div>
          )}
        </section>
      )}

      {isAlbumOpen && activeAlbum && (
        <section style={styles.portfolioGrid}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth: '1800px', margin: '0 auto', padding: '0 48px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <button 
                onClick={() => { setIsAlbumOpen(false); setActiveAlbum(null); }} 
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid #333', 
                  color: '#fff', padding: '8px 16px', cursor: 'pointer', marginRight: '12px'
                }}
              >← Back</button>
              <span style={{fontFamily: 'Erbaum, Cousine, monospace', fontSize: '20px', color:'#fff'}}>{activeAlbum.name}</span>
            </div>
            <div style={{color:'#A0A0A0'}}>{activeAlbum.items.length} items</div>
          </div>
          <div style={{...styles.gridContainer, marginTop: '20px'}} className="portfolio-grid-container">
            {activeAlbum.items.map((item) => (
              <WorkCard
                key={item.id}
                item={item}
                showText={activeAlbum.slug === 'designs'}
                onOpen={() => { setActiveWork(item); setIsWorkOpen(true); }}
              />
            ))}
          </div>
        </section>
      )}

      {isWorkOpen && activeWork && (activeWork.videoUrl ? null : (
        <WorkModal work={activeWork} onClose={() => setIsWorkOpen(false)} />
      ))}

      <style>{`
        .filter-btn-hover:hover { border-color: rgba(93, 205, 219, 0.3) !important; color: #fff !important; }
        .portfolio-grid-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        
        @media (max-width: 1024px) {
          .portfolio-grid-container { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-hero { min-height: 400px !important; padding: 60px 24px !important; }
          .portfolio-filter-section { padding: 24px !important; }
          .portfolio-grid-section { padding: 40px 24px !important; }
        }
        @media (max-width: 768px) {
          .portfolio-grid-container { grid-template-columns: 1fr !important; }
          .portfolio-filter-buttons { flex-wrap: wrap; justify-content: center; gap: 12px !important; }
          .portfolio-filter-btn { padding: 10px 18px !important; font-size: 14px !important; }
          .portfolio-grid-section { padding: 32px 20px !important; }
        }
        @media (max-width: 480px) {
          .portfolio-hero { min-height: 320px !important; padding: 40px 16px !important; }
          .portfolio-grid-section { padding: 24px 12px !important; }
        }
      `}</style>
    </div>
  );
}

function AlbumCard({ album, onOpen }: { album: Album, onOpen: () => void }) {
  const rep = album.items[0];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.albumCard,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 40px rgba(93, 205, 219, 0.15)' : 'none',
        borderColor: isHovered ? 'rgba(93,205,219,0.5)' : 'rgba(93,205,219,0.06)'
      }}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.albumThumb}>
        <img
          src={rep.image}
          alt={album.name}
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/portfoliopic1.jpg'; }}
          style={{ 
            width: '100%', height: '100%', objectFit: 'cover', 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)', 
            transition: 'transform 0.5s ease', display: 'block' 
          }}
        />
      </div>
      <div style={styles.albumInfo}>
        <div style={styles.albumName}>{album.name}</div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: '12px'}}>
          <div style={styles.albumCompany}>{album.company || ''}</div>
          <div style={styles.albumCount}>{album.items.length} items</div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ item, onOpen, showText = true, editable = false, onTitleChange }: { 
  item: PortfolioItem, onOpen: () => void, showText?: boolean, editable?: boolean, onTitleChange?: (t: string) => void 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.portfolioCard,
        borderColor: isHovered ? 'rgba(93, 205, 219, 0.5)' : 'rgba(93, 205, 219, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 40px rgba(93, 205, 219, 0.15)' : 'none',
      }}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{ 
          ...styles.portfolioImage,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <img 
          src={item.image} 
          alt={item.title} 
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/portfoliopic1.jpg'; }} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
        />
        {item.videoUrl ? <div style={styles.videoBadge}>▶</div> : null}
      </div>
      {showText && (
        <>
          <div style={{...styles.portfolioGradient, opacity: isHovered ? 0.85 : 0.6}}></div>
          <div style={{...styles.portfolioContent, transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'}}>
            <div style={{...styles.albumName, marginBottom: '6px'}}>
              {editable ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLDivElement).blur(); } }}
                  onBlur={(e) => { onTitleChange && onTitleChange((e.target as HTMLDivElement).innerText.trim()); }}
                  style={{ outline: 'none', cursor: 'text' }}
                >{item.title}</div>
              ) : (
                item.title
              )}
            </div>
            <div style={styles.albumCompany}>{item.client}</div>
          </div>
        </>
      )}
    </div>
  );
}

function WorkModal({ work, onClose }: { work: PortfolioItem, onClose: () => void }) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>×</button>
        <div style={styles.modalImageWrapper}>
          <img 
            src={work.image} 
            alt={work.title} 
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/portfoliopic1.jpg'; }} 
            style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  portfolioPage: { minHeight: '100vh', background: '#0F0F0F', paddingTop: '140px' },
  header: { position: 'relative', padding: '80px 48px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', overflow: 'hidden' },
  heroImageWrapper: { position: 'absolute', inset: 0, zIndex: 0, background: '#0F0F0F' },
  heroImageOverlay: { position: 'absolute', inset: 0, background: 'transparent' },
  headerContent: { position: 'relative', zIndex: 2, maxWidth: '1400px', textAlign: 'center' },
  heading: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 700, fontSize: '50px', lineHeight: '60px', letterSpacing: '-0.51808px', color: '#FFFFFF', marginBottom: '8px' },
  gradient: { background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  subtitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '15px', color: '#A0A0A0', maxWidth: '1400px', margin: '0 auto' },
  filterSection: { padding: '32px 48px', display: 'flex', justifyContent: 'center' },
  filterButtons: { display: 'flex', gap: '16px', alignItems: 'center' },
  filterBtn: { padding: '12px 24px', fontFamily: 'Cousine, monospace', fontSize: '15px', color: '#A0A0A0', background: 'rgba(37, 37, 37, 0.6)', border: '0.8px solid rgba(93, 205, 219, 0.1)', cursor: 'pointer', transition: 'all 0.3s ease' },
  filterBtnActive: { background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)', color: '#FFFFFF', border: 'none' },
  portfolioGrid: { padding: '48px' },
  gridContainer: { maxWidth: '1400px', margin: '0 auto' },
  albumCard: { background: '#151515', border: '0.8px solid rgba(93,205,219,0.06)', height: '400px', overflow: 'hidden', cursor: 'pointer', position: 'relative', transition: 'all 0.45s cubic-bezier(.16,.84,.44,1)' },
  albumThumb: { position: 'relative', height: '100%', background: '#1a1a1a', overflow: 'hidden' },
  albumInfo: { position: 'absolute', inset: 'auto 0 0 0', padding: '18px', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)' },
  albumName: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '20px', color: '#fff' },
  albumCompany: { fontFamily: 'Cousine, monospace', fontSize: '20px', color: '#A0A0A0' },
  albumCount: { fontSize: '13px', color: '#9a9a9a' },
  portfolioCard: { position: 'relative', height: '400px', background: '#252525', overflow: 'hidden', cursor: 'pointer', border: '0.8px solid rgba(93, 205, 219, 0.1)', transition: 'all 0.5s cubic-bezier(.16,.84,.44,1)' },
  portfolioImage: { width: '100%', height: '100%', background: '#2A2A2A', overflow: 'hidden', position: 'relative', transition: 'transform 0.5s ease' },
  videoBadge: { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '22px' },
  portfolioGradient: { position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)', transition: 'opacity 0.3s ease' },
  portfolioContent: { position: 'absolute', inset: 'auto 0 0 0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 1, transition: 'transform 0.4s ease' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' },
  modalContent: { position: 'relative', background: 'transparent', maxWidth: '1100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalClose: { position: 'absolute', right: '-20px', top: '-20px', background: '#5DCDDB', color: '#000', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer' },
  modalImageWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
};
