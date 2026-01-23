"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import styles from './portfolio.module.css';
import { useScrollAnimation, scrollAnimationVariants, staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

const portfolioItems = [
  { id: 1, category: 'Photos', album: 'Christmas', title: 'Snowy Editorial', client: 'Elegance Co.', image: '/portfolio1.jpg' },
  { id: 2, category: 'Photos', album: 'Fashion', title: 'Tech Product Launch', client: 'Innovation Labs', image: '/portfolio2.jpg' },
  { id: 3, category: 'Photos', album: 'Architecture', title: 'Modern Architecture Series', client: 'Urban Spaces', image: '/portfolio3.jpg' },
  { id: 4, category: 'Design', album: 'Brand Refresh', title: 'Beauty Brand Refresh', client: 'Radiance Cosmetics', image: '/portfolio4.jpg' },
  { id: 5, category: 'Photos', album: 'Fashion', title: 'Editorial Fashion Story', client: 'Vogue Magazine', image: '/portfolio5.jpg' },
  { id: 6, category: 'Videos', album: 'Campaigns', title: 'Luxury Watch Campaign', client: 'Timepiece Co.', image: '/portfolio6.jpg', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 7, category: 'Photos', album: 'Commercial', title: 'Commercial Product Series', client: 'Various Clients', image: '/portfolio7.jpg' },
  { id: 8, category: 'Projects', album: 'Identity Systems', title: 'Brand Identity System', client: 'StartUp Inc.', image: '/portfolio8.jpg' },
  { id: 9, category: 'Digital', album: 'Social', title: 'Social Media Campaign', client: 'Lifestyle Brand', image: '/portfolio9.jpg' },
  { id: 10, category: 'Design', album: 'Packaging', title: 'Packaging Design Series', client: 'Gourmet Goods', image: '/portfolio10.jpg' },
  { id: 11, category: 'Photos', album: 'Christmas', title: 'Holiday Lights', client: 'Local Shop', image: '/portfolio3.jpg' },
  { id: 12, category: 'Photos', album: 'Fashion', title: 'Runway Series', client: 'Vogue Magazine', image: '/portfolio5.jpg' },
];

const categories = ['Photos', 'Videos', 'Designs', 'Projects', 'Digitals'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(null);

  // Video cards state: 7 thumbnails saved as /images/video_1.jpg ... /images/video_7.jpg
  const [videoCards, setVideoCards] = useState(() => [
    { id: 'video-01', category: 'Videos', album: 'Videos', title: 'Martex Visuals', client: 'Martex MFG (Pvt) Ltd', image: '/images/video_1.jpg', videoUrl: 'https://www.youtube.com/watch?embeds_referring_euri=https%3A%2F%2Fpasindusahan.com%2F&source_ve_path=Mjg2NjQsMTY0NTAz&v=MsoBTxHMw18&feature=youtu.be' },
    { id: 'video-02', category: 'Videos', album: 'Videos', title: 'Outdoor Shoot', client: 'Winter Collection', image: '/images/video_2.jpg', videoUrl: 'https://www.youtube.com/shorts/WhNaqAWp66k' },
    { id: 'video-03', category: 'Videos', album: 'Videos', title: 'Dance Moves', client: 'Winter Collection', image: '/images/video_3.jpg', videoUrl: 'https://www.youtube.com/watch?v=Aw4NQHstMxM' },
    { id: 'video-04', category: 'Videos', album: 'Videos', title: 'Commercial Shoot', client: 'Winter Collection', image: '/images/video_4.jpg', videoUrl: 'https://www.youtube.com/watch?v=L7Gml5dMPWI' },
    { id: 'video-05', category: 'Videos', album: 'Videos', title: 'Christmas Video', client: 'Winter Collection', image: '/images/video_5.jpg', videoUrl: 'https://youtube.com/shorts/CR4Q56tmyDU?feature=share' },
    { id: 'video-06', category: 'Videos', album: 'Videos', title: 'Studio Shoot 1', client: 'Winter Collection', image: '/images/video_6.jpg', videoUrl: 'https://www.youtube.com/shorts/xNJEw8xTqc8' },
    { id: 'video-07', category: 'Videos', album: 'Videos', title: 'Studio Shoot 2', client: 'Winter Collection', image: '/images/video_7.jpg', videoUrl: 'https://youtube.com/shorts/aOfP_mBvUHM?feature=share' },
  ]);

  // handler to update a video's title (editable in UI)
  const handleUpdateVideoTitle = (id, newTitle) => {
    setVideoCards((prev) => prev.map((v) => (v.id === id ? { ...v, title: newTitle } : v)));
  };

  // handler to update a video's company/client (editable in UI)
  const handleUpdateVideoClient = (id, newClient) => {
    setVideoCards((prev) => prev.map((v) => (v.id === id ? { ...v, client: newClient } : v)));
  };

  const albums = useMemo(() => {
    const filtered = portfolioItems.filter((item) => item.category === activeCategory);
    if (activeCategory === 'Design') {
      // Use a fixed list of 15 distinct design cards (titles + image paths)
      const designs = [
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

      return photoAlbums.map((a) => {
        const name = a.name;
        const slugSource = a.slug || name;
        const slug = String(slugSource).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
        const items = Array.from({ length: a.count }).map((_, ci) => ({
          id: `photos-${a.num}-${ci + 1}`,
          category: 'Photos',
          album: name,
          title: `${name} ${ci + 1}`, 
          client: a.company || '',
          // Use public images placed under /public/images following naming convention
          image: `/images/album${String(a.num).padStart(2, '0')}-${slug}-${String(ci + 1).padStart(2,'0')}.jpg`,
        }));
        return { name, items, number: a.num, company: a.company, slug };
      });
    }

    if (activeCategory === 'Videos') {
      // Return the videoCards state as a single 'Videos' album
      return [{ name: 'Videos', items: videoCards, number: 0, company: '', slug: 'videos' }];
    }

    const fallbackByCategory = {
      Videos: '/images/portfoliopic1.jpg',
      Design: '/images/portfoliopic2.jpg',
      Projects: '/images/portfoliopic3.jpg',
      Digital: '/images/portfoliopic2.jpg',
    };

    return filtered.map((item, idx) => {
      const name = item.album || item.title;
      const slug = String(name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
      const image = item.image || fallbackByCategory[item.category] || `/images/portfoliopic${(idx % 3) + 1}.jpg`;
      return {
        name,
        company: item.client || '',
        slug,
        items: [{ ...item, image }],
      };
    });
  }, [activeCategory]);

  // If `album` query param is present, open that album on load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search || '');
    const albumParam = searchParams.get('album');
    if (!albumParam) return;
    const found = albums.find((al) => al.slug === albumParam || al.name.toLowerCase().replace(/[^a-z0-9]+/g,'-') === albumParam);
    if (found) {
      setActiveAlbum(found);
      setIsAlbumOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { ref: filterRef, isInView: filterInView } = useScrollAnimation();
  const { ref: gridRef } = useScrollAnimation();
 

  return (
    <div className={styles.portfolioPage}>
      {/* Header Section with Image */}
      <section className={styles.header}>
        {/* hero image removed per request; keep an empty decorative wrapper for layout */}
        <div className={styles.heroImageWrapper} aria-hidden="true" />
        <div className={styles.heroImageOverlay} aria-hidden="true" />

        <div className={styles.headerContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className={styles.heading}>
              Our <span className={styles.gradient}>Creative Work</span>
            </h1>
            <p className={styles.subtitle}>
              A showcase of our most impactful projects across branding, photography, video, and digital campaigns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className={styles.filterSection} ref={filterRef}>
        <motion.div
          className={styles.filterButtons}
          initial="hidden"
          animate={filterInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`${styles.filterBtn} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => { setActiveCategory(category); setIsAlbumOpen(false); setActiveAlbum(null); }}
              variants={staggerItemVariants}
            >
              {category}
            </motion.button>
            ))}
        </motion.div>
      </section>

      {/* Portfolio Grid / Albums or Album Items (drill-in) */}
      {!isAlbumOpen && (
        <section className={styles.portfolioGrid} ref={gridRef} key={activeCategory}>
          {albums.length === 0 ? (
            <div style={{color:'#A0A0A0', textAlign:'center', padding:'48px 0', fontFamily: 'Cousine, monospace'}}>
              No work in this category yet.
            </div>
          ) : (
            <div className={styles.gridContainer}>
              {(activeCategory === 'Design' || activeCategory === 'Videos') ? (
                // Render the design or video cards directly
                albums[0].items.map((item) => (
                  <WorkCard
                    key={item.id}
                    {...item}
                    showText={true}
                    editable={activeCategory === 'Videos'}
                    onTitleChange={(newTitle) => { if (activeCategory === 'Videos') handleUpdateVideoTitle(item.id, newTitle); }}
                    onOpen={() => {
                      if (activeCategory === 'Videos' && item.videoUrl) {
                        // open video link in new tab
                        if (typeof window !== 'undefined') window.open(item.videoUrl, '_blank');
                        return;
                      }
                      setActiveWork(item); setIsWorkOpen(true);
                    }}
                  />
                ))
              ) : (
                albums.map((album) => (
                  <div key={album.name}>
                    <AlbumCard album={album} onOpen={() => { setActiveAlbum(album); setIsAlbumOpen(true); }} />
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      )}

      {isAlbumOpen && activeAlbum && (
        <section className={styles.portfolioGrid}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth: '1800px', margin: '0 auto', padding: '0 48px'}}>
            <div>
              <button className="btn" onClick={() => { setIsAlbumOpen(false); setActiveAlbum(null); }} style={{marginRight:12}}>← Back</button>
              <span style={{marginLeft:8, fontFamily: 'Erbaum, Cousine, monospace', fontSize: '20px', color:'#fff'}}>{activeAlbum.name}</span>
            </div>
            <div style={{color:'#A0A0A0'}}>{activeAlbum.items.length} items</div>
          </div>
          <div className={styles.gridContainer} style={{marginTop:20}}>
            {activeAlbum.items.map((item) => (
              <WorkCard
                key={item.id}
                {...item}
                showText={activeAlbum.slug === 'designs'}
                onOpen={() => { setActiveWork(item); setIsWorkOpen(true); }}
              />
            ))}
          </div>
        </section>
      )}

      {isWorkOpen && activeWork && (
        <WorkModal work={activeWork} onClose={() => setIsWorkOpen(false)} />
      )}
    </div>
  );
}

function AlbumCard({ album, onOpen }) {
  const rep = album.items[0];
  const [isHovered, setIsHovered] = useState(false);
  console.log('AlbumCard render:', album.name, rep?.image);

  return (
    <div
      className={styles.albumCard}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 40px rgba(93, 205, 219, 0.15)' : 'none',
        borderColor: isHovered ? 'rgba(93,205,219,0.5)' : 'rgba(93,205,219,0.06)'
      }}
    >
      <div className={styles.albumThumb} data-src={rep?.image} style={{ position: 'relative', overflow: 'hidden' }}>
        {rep.image ? (
          <img
            src={rep.image}
            alt={album.name}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/portfoliopic1.jpg'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease', display: 'block' }}
          />
        ) : null}
      </div>
      <div className={styles.albumInfo}>
        <div className={styles.albumName}>{album.name}</div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
          <div className={styles.albumCompany} style={{ fontFamily: "'Cousine', monospace" }}>{album.company || ''}</div>
          <div className={styles.albumCount}>{album.items.length} items</div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({ id, title, client, image, videoUrl, onOpen, showText = true, editable = false, onTitleChange }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.portfolioCard}
      onClick={onOpen}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.portfolioImage}
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }}
      >
        {image ? <img src={image} alt={title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/portfoliopic1.jpg'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : null}
        {videoUrl ? <div className={styles.videoBadge}>▶</div> : null}
      </div>
      {showText && (
        <>
          <div className={styles.portfolioGradient} style={{ opacity: isHovered ? 0.85 : 0.6, transition: 'opacity 0.3s ease' }}></div>
          <div className={styles.portfolioContent} style={{ transform: isHovered ? 'translateY(-8px)' : 'translateY(0)', transition: 'transform 0.4s ease' }}>
            {/* For designs we show name and company using album styles (same size as photo album text) */}
            <div className={styles.albumName} style={{ marginBottom: 6 }}>
              {editable ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } }}
                  onBlur={(e) => { const text = e.currentTarget.innerText.trim(); onTitleChange && onTitleChange(text); }}
                  style={{ outline: 'none', cursor: 'text' }}
                >{title}</div>
              ) : (
                title
              )}
            </div>
            <div className={styles.albumCompany}>{client}</div>
          </div>
        </>
      )}
    </div>
  );
}

function WorkModal({ work, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e)=>e.stopPropagation()}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={(e) => { e.stopPropagation(); onClose && onClose(); }}
          aria-label="Close modal"
        >×</button>
        {work.videoUrl ? (
          <div style={{position:'relative', width:'100%', paddingTop:'56.25%'}}>
            <iframe src={work.videoUrl} title={work.title} style={{position:'absolute', top:0,left:0,width:'100%',height:'100%'}} frameBorder="0" allowFullScreen />
          </div>
        ) : (
          <div className={styles.modalImageWrapper}>
            {work.image ? <img src={work.image} alt={work.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/portfoliopic1.jpg'; }} /> : null}
          </div>
        )}
      </div>
    </div>
  );
}