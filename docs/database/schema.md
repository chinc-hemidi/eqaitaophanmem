# Database Schema (MVP)

## emotion_zones
- id (PK)
- code (unique)
- name
- color
- sort_order
- is_active
- created_at
- updated_at

## checkin_points
- id (PK)
- code (unique)
- name
- description (nullable)
- qr_url (nullable)
- active_from (nullable)
- active_to (nullable)
- is_active
- created_at
- updated_at

## emotion_checkins
- id (PK)
- checkin_point_id (FK -> checkin_points.id)
- emotion_zone_id (FK -> emotion_zones.id)
- client_hash
- note (nullable)
- created_date (YYYY-MM-DD)
- created_at

## Indexes
- emotion_checkins(checkin_point_id, client_hash, created_date)
