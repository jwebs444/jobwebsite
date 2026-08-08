PRAGMA foreign_keys = ON;

BEGIN;

CREATE TABLE sources (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    region TEXT,
    page_number INTEGER,
    image_filename TEXT NOT NULL UNIQUE,
    notes TEXT
);

CREATE TABLE sites (
    id INTEGER PRIMARY KEY,
    source_id INTEGER NOT NULL REFERENCES sources(id),
    name TEXT NOT NULL,
    latitude REAL NOT NULL CHECK (latitude BETWEEN -90 AND 90),
    longitude REAL NOT NULL CHECK (longitude BETWEEN -180 AND 180),
    nearest_town TEXT,
    nearest_town_state TEXT,
    site_category TEXT NOT NULL,
    total_sites INTEGER CHECK (total_sites IS NULL OR total_sites >= 0),
    rv_sites INTEGER CHECK (rv_sites IS NULL OR rv_sites >= 0),
    tent_allowed INTEGER CHECK (tent_allowed IN (0, 1) OR tent_allowed IS NULL),
    rv_allowed INTEGER CHECK (rv_allowed IN (0, 1) OR rv_allowed IS NULL),
    max_rig_description TEXT,
    water_available INTEGER CHECK (water_available IN (0, 1) OR water_available IS NULL),
    toilet_type TEXT,
    showers_available INTEGER CHECK (showers_available IN (0, 1) OR showers_available IS NULL),
    fee_amount REAL CHECK (fee_amount IS NULL OR fee_amount >= 0),
    fee_description TEXT,
    reservations_accepted INTEGER CHECK (reservations_accepted IN (0, 1) OR reservations_accepted IS NULL),
    stay_limit_days INTEGER CHECK (stay_limit_days IS NULL OR stay_limit_days >= 0),
    elevation_ft INTEGER CHECK (elevation_ft IS NULL OR elevation_ft >= 0),
    telephone TEXT,
    open_season TEXT,
    notes TEXT,
    original_text TEXT NOT NULL,
    transcription_status TEXT NOT NULL DEFAULT 'machine-read'
        CHECK (transcription_status IN ('unreviewed', 'machine-read', 'human-verified', 'incomplete')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sites_coordinates ON sites(latitude, longitude);
CREATE INDEX idx_sites_name ON sites(name);
CREATE INDEX idx_sites_nearest_town ON sites(nearest_town, nearest_town_state);

CREATE TABLE features (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE site_features (
    site_id INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    feature_id INTEGER NOT NULL REFERENCES features(id) ON DELETE CASCADE,
    PRIMARY KEY (site_id, feature_id)
);

INSERT INTO sources (id, title, region, page_number, image_filename, notes) VALUES
(1, 'Bureau of Land Management Camping', 'Utah', 92, 'Scan_20260808_112043.jpg', 'Entries visible on photographed book page; headers intentionally not stored.'),
(2, 'Bureau of Land Management Camping', 'Utah', 93, 'Scan_20260808_112029.jpg', 'Complete records only; the final cut-off record was omitted.');

INSERT INTO sites (source_id,name,latitude,longitude,nearest_town,nearest_town_state,site_category,total_sites,rv_sites,tent_allowed,rv_allowed,max_rig_description,water_available,toilet_type,showers_available,fee_amount,fee_description,reservations_accepted,stay_limit_days,elevation_ft,telephone,open_season,notes,original_text) VALUES
(1,'Big Park V Dispersed',39.710753,-109.233724,'Vernal','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6649,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6649ft, Nearest town: Vernal. GPS: 39.710753, -109.233724'),
(1,'Book Cliffs Dispersed',39.711885,-109.217447,'Vernal','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6753,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6753ft, Nearest town: Vernal. GPS: 39.711885, -109.217447'),
(1,'Brewer Overlook Dispersed',39.708019,-109.209894,'Vernal','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6849,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6849ft, Nearest town: Vernal. GPS: 39.708019, -109.209894'),
(1,'Bryson Canyon Dispersed',39.237879,-109.202382,'Cisco','UT','dispersed',NULL,NULL,0,0,NULL,0,'none',NULL,0,'Free',0,NULL,5042,NULL,NULL,'No tents/RVs.','Dispersed sites, No water, No toilets, No tents/RVs: Free, Reservations not accepted, Elev: 5042ft, Nearest town: Cisco. GPS: 39.237879, -109.202382'),
(1,'Cisco Boat Ramp',38.969865,-109.251941,'Cisco','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,4163,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 4163ft, Nearest town: Cisco. GPS: 38.969865, -109.251941'),
(1,'Colorado River - Grand Camp',39.121814,-109.065428,'Fruita','CO','dispersed',NULL,NULL,1,0,NULL,0,NULL,NULL,0,'Free',NULL,NULL,4333,NULL,NULL,'Boat-in sites; no open fires.','Dispersed sites, No water, Tents only: Free, Also boat-in sites, No open fires, Elev: 4333ft, Nearest town: Fruita, CO. GPS: 39.121814, -109.065428'),
(1,'Colorado River - Stateline',39.118068,-109.051685,'Fruita','CO','dispersed',NULL,NULL,1,0,NULL,0,NULL,NULL,0,'Free',NULL,NULL,4333,NULL,NULL,'Boat-in sites; no open fires.','Dispersed sites, No water, Tents only: Free, Also boat-in sites, No open fires, Elev: 4333ft, Nearest town: Fruita, CO. GPS: 39.118068, -109.051685'),
(1,'Desperation 1 Dispersed',39.622204,-109.230632,'Thompson','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',NULL,NULL,7101,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Elev: 7101ft, Nearest town: Thompson. GPS: 39.622204, -109.230632'),
(1,'Desperation 2 Dispersed',39.601343,-109.204659,'Thompson','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',NULL,NULL,7306,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Elev: 7306ft, Nearest town: Thompson. GPS: 39.601343, -109.204659'),
(1,'Grand Valley Overlook Dispersed',39.484356,-109.093088,'Thompson','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,8135,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 8135ft, Nearest town: Thompson. GPS: 39.484356, -109.093088'),
(1,'Hidden Camp Dispersed',39.643185,-109.482666,'Vernal','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6655,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6655ft, Nearest town: Vernal. GPS: 39.643185, -109.482666'),
(1,'Indian Springs Ridge Dispersed',39.657873,-109.130091,'Dinosaur','CO','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,7590,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 7590ft, Nearest town: Dinosaur, CO. GPS: 39.657873, -109.130091'),
(1,'Kokopelli''s Trail - Bitter Creek Overlook',39.157014,-109.108319,NULL,NULL,'developed',5,0,1,0,NULL,0,'none',NULL,20,'Tents only: $20',0,NULL,5060,'435-259-2100',NULL,NULL,'Total sites: 5, RV sites: 0, No water, No toilets, Tents only: $20, Reservations not accepted, Elev: 5060ft, Tel: 435-259-2100. GPS: 39.157014, -109.108319'),
(1,'Kokopelli''s Trail - Fish Ford',38.923652,-109.247883,'Moab','UT','developed',10,10,1,1,NULL,0,'vault/pit',0,0,'Free',0,14,4157,'435-259-2100',NULL,'No RV dump.','Total sites: 10, RV sites: 10, No water, Vault/pit toilet, No showers, No RV dump, Tent & RV camping: Free, Stay limit: 14 days, Reservations not accepted, Elev: 4157ft, Tel: 435-259-2100, Nearest town: Moab. GPS: 38.923652, -109.247883'),
(1,'Kokopelli''s Trail - Westwater',39.087471,-109.101798,'Fruita','CO','developed',15,0,1,0,NULL,0,'vault/pit',0,20,'Tents only: $20',0,14,4335,'435-259-2100',NULL,'No RV dump; boat-in and group sites; group size 100.','Total sites: 15, RV sites: 0, No water, Vault/pit toilet, No showers, No RV dump, Tents only: $20, Also boat-in and group sites, Group size: $100, Stay limit: 14 days, Reservations not accepted, Elev: 4335ft, Tel: 435-259-2100, Nearest town: Fruita, CO. GPS: 39.087471, -109.101798'),
(1,'Little Valley Road Dispersed',38.948153,-110.095078,'Green River','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',NULL,NULL,4311,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Elev: 4311ft, Nearest town: Green River. GPS: 38.948153, -110.095078'),
(1,'Lower South Canyon Dispersed',39.459094,-109.252717,'Loma','CO','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,7756,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 7756ft, Nearest town: Loma, CO. GPS: 39.459094, -109.252717'),
(1,'Massey Jct Dispersed',39.706875,-109.143266,'Dinosaur','CO','dispersed',NULL,NULL,1,1,NULL,0,'vault/pit',NULL,0,'Free',NULL,NULL,7243,NULL,NULL,NULL,'Dispersed sites, No water, Vault/pit toilet, Tent & RV camping: Free, Elev: 7243ft, Nearest town: Dinosaur (CO). GPS: 39.706875, -109.143266'),
(1,'Nefertiti Rapids',39.195279,-110.077249,'Green River','UT','dispersed',NULL,NULL,1,1,NULL,0,'vault/pit',NULL,0,'Free',NULL,NULL,4163,'435-636-3600',NULL,NULL,'Dispersed sites, No water, Vault/pit toilet, Tent & RV camping: Free, Elev: 4163ft, Tel: 435-636-3600, Nearest town: Green River. GPS: 39.195279, -110.077249'),
(1,'PR Springs',39.462642,-109.283744,'Loma','CO','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,8043,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 8043ft, Nearest town: Loma (CO). GPS: 39.462642, -109.283744'),
(1,'Sand Wash Rec Area',39.839579,-109.913639,'Myton','UT','dispersed',NULL,NULL,1,0,NULL,0,'vault/pit',NULL,0,'Free',0,NULL,4638,'434-636-3600',NULL,'Put-in for Desolation and Gray Canyons of the Green River.','Dispersed sites, No water, Vault/pit toilet, Tents only: Free, For those who plan to put in to Desolation and Gray Canyons of the Green River the next day, Reservations not accepted, Elev: 4638ft, Tel: 434-636-3600, Nearest town: Myton. GPS: 39.839579, -109.913639'),
(1,'Seep Ridge Dispersed',39.511024,-109.346906,'Loma','CO','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,7744,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 7744ft, Nearest town: Loma, CO. GPS: 39.511024, -109.346906'),
(1,'South Canyon Group',39.457225,-109.256224,'Loma','CO','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,7809,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 7809ft, Nearest town: Loma, CO. GPS: 39.457225, -109.256224'),
(2,'Three Mile Canyon Dispersed',39.790467,-109.153592,'Vernal','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6556,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6556ft, Nearest town: Vernal. GPS: 39.790467, -109.153592'),
(2,'Twilight Dispersed',39.417306,-109.332595,'Thompson','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,8236,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 8236ft, Nearest town: Thompson. GPS: 39.417306, -109.332595'),
(2,'Upper South Canyon Dispersed',39.458464,-109.254494,'Loma','CO','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,7770,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 7770ft, Nearest town: Loma, CO. GPS: 39.458464, -109.254494'),
(2,'White River Enron 1-3 Dispersed',40.010107,-109.445646,'Vernal','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,4739,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 4739ft, Nearest town: Vernal. GPS: 40.010107, -109.445646'),
(2,'Winter Ridge',39.460987,-109.460495,NULL,NULL,'dispersed',NULL,NULL,1,1,'Nothing larger than van/truck camper',0,'none',NULL,0,'Free',NULL,NULL,7544,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Nothing larger than van/TC, Elev: 7544ft. GPS: 39.460987, -109.460495'),
(2,'Zane Canyon Dispersed',39.709777,-109.222607,'Vernal','UT','dispersed',NULL,NULL,1,0,NULL,0,'none',NULL,0,'Free',0,NULL,6727,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tents only: Free, Reservations not accepted, Elev: 6727ft, Nearest town: Vernal. GPS: 39.709777, -109.222607'),
(2,'Fossil Mountain Dispersed',38.881279,-113.468213,'Delta','UT','dispersed',NULL,NULL,1,1,'Nothing larger than truck camper',0,'none',NULL,0,'Free',0,NULL,5619,'435-743-3100',NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Nothing larger than truck camper, Reservations not accepted, Elev: 5619ft, Tel: 435-743-3100, Nearest town: Delta. GPS: 38.881279, -113.468213'),
(2,'Parowan Gap',37.912233,-112.980007,'Parowan','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,5644,NULL,'Open all year','Near Parowan Gap Petroglyph Site.','Dispersed sites, No water, No toilets, Tent & RV camping: Free, Near Parowan Gap Petroglyph Site, Open all year, Reservations not accepted, Elev: 5644ft, Nearest town: Parowan. GPS: 37.912233, -112.980007'),
(2,'Rocky Peak',37.760197,-113.185846,'Cedar City','UT','developed',18,18,1,1,NULL,0,'vault/pit',NULL,5,'Tent & RV camping: $5',0,14,5950,'435-865-3000',NULL,NULL,'Total sites: 18, RV sites: 18, No water, Vault/pit toilet, Tent & RV camping: $5, Stay limit: 14 days, Reservations not accepted, Elev: 5950ft, Tel: 435-865-3000, Nearest town: Cedar City. GPS: 37.760197, -113.185846'),
(2,'Big Rocks SRMA',38.360632,-111.635449,'Loa','UT','dispersed',NULL,NULL,1,1,'Small rigs',0,'none',NULL,0,'Free',0,NULL,7101,'435-896-1500',NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Small rigs, Reservations not accepted, Elev: 7101ft, Tel: 435-896-1500, Nearest town: Loa. GPS: 38.360632, -111.635449'),
(2,'Glenwood Open OHV Area',38.796833,-111.973966,'Glenwood','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,14,5441,'435-896-1500',NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Stay limit: 14 days, Reservations not accepted, Elev: 5441ft, Tel: 435-896-1500, Nearest town: Glenwood. GPS: 38.796833, -111.973966'),
(2,'Gold Gulch Rd Dispersed 1',38.360228,-112.237111,'Marysvale','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6562,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6562ft, Nearest town: Marysvale. GPS: 38.360228, -112.237111'),
(2,'Gold Gulch Rd Dispersed 2',38.356137,-112.240179,'Marysvale','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,NULL,6722,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Reservations not accepted, Elev: 6722ft, Nearest town: Marysvale. GPS: 38.356137, -112.240179'),
(2,'Otter Creek Reservoir - Fisherman''s Beach',38.180109,-112.012049,'Antimony','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',NULL,14,6417,'435-896-1500',NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Stay limit: 14 days, Elev: 6417ft, Tel: 435-896-1500, Nearest town: Antimony. GPS: 38.180109, -112.012049'),
(2,'Otter Creek Reservoir - South Point',38.173026,-112.014363,'Antimony','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,14,6387,'435-896-1500',NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Stay limit: 14 days, Reservations not accepted, Elev: 6387ft, Tel: 435-896-1500, Nearest town: Antimony. GPS: 38.173026, -112.014363'),
(2,'Otter Creek Reservoir East Side Dispersed 1',38.196095,-111.987703,'Antimony','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',0,14,6395,'435-896-1500',NULL,'Numerous sites along lakeshore.','Dispersed sites, No water, No toilets, Tent & RV camping: Free, Numerous sites along lakeshore, Stay limit: 14 days, Reservations not accepted, Elev: 6395ft, Tel: 435-896-1500, Nearest town: Antimony. GPS: 38.196095, -111.987703'),
(2,'Rock Corral',38.372466,-112.834018,'Milford','UT','dispersed',NULL,NULL,1,1,NULL,0,'vault/pit',NULL,0,'Free',NULL,NULL,7093,'435-586-2401','May-Nov',NULL,'Dispersed sites, No water, Vault/pit toilet, Tent & RV camping: Free, Open May-Nov, Elev: 7093ft, Tel: 435-586-2401, Nearest town: Milford. GPS: 38.372466, -112.834018'),
(2,'Bea''s Lewis Flat',38.297556,-111.388149,'Torrey','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',NULL,NULL,6744,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Elev: 6744ft, Nearest town: Torrey. GPS: 38.297556, -111.388149'),
(2,'Blue Notch Road',37.763527,-110.293623,'Bluff','UT','dispersed',NULL,NULL,1,1,NULL,0,'none',NULL,0,'Free',NULL,NULL,4831,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tent & RV camping: Free, Elev: 4831ft, Nearest town: Bluff. GPS: 37.763527, -110.293623'),
(2,'Cainville Wash Road Dispersed',38.391212,-111.026977,'Hanksville','UT','dispersed',NULL,NULL,1,0,NULL,0,'none',NULL,0,'Free',NULL,NULL,5050,NULL,NULL,'4x4 recommended.','Dispersed sites, No water, No toilets, Tents only: Free, 4x4 recommended, Elev: 5050ft, Nearest town: Hanksville. GPS: 38.391212, -111.026977'),
(2,'Chute Canyon TH Dispersed',38.629154,-110.763255,'Green River','UT','dispersed',NULL,NULL,1,0,NULL,0,'none',NULL,0,'Free',0,14,5177,NULL,NULL,NULL,'Dispersed sites, No water, No toilets, Tents only: Free, Stay limit: 14 days, Reservations not accepted, Elev: 5177ft, Nearest town: Green River. GPS: 38.629154, -110.763255'),
(2,'Coal Mine Wash',38.378011,-110.899811,'Hanksville','UT','dispersed',NULL,NULL,1,1,NULL,0,'vault/pit',NULL,0,'Free',NULL,NULL,4662,NULL,NULL,NULL,'Dispersed sites, No water, Vault/pit toilet, Tent & RV camping: Free, Elev: 4662ft, Nearest town: Hanksville. GPS: 38.378011, -110.899811');

INSERT INTO features (name) VALUES
('Boat-in'),('Group sites'),('No open fires'),('Small rigs'),('4x4 recommended'),
('Trailhead'),('Lakeshore'),('OHV area'),('Petroglyph site nearby'),('No RV dump');

INSERT INTO site_features (site_id, feature_id)
SELECT s.id, f.id FROM sites s JOIN features f
WHERE (s.name IN ('Colorado River - Grand Camp','Colorado River - Stateline') AND f.name IN ('Boat-in','No open fires'))
   OR (s.name = 'Kokopelli''s Trail - Westwater' AND f.name IN ('Boat-in','Group sites','No RV dump'))
   OR (s.name = 'Kokopelli''s Trail - Fish Ford' AND f.name = 'No RV dump')
   OR (s.name = 'Big Rocks SRMA' AND f.name = 'Small rigs')
   OR (s.name = 'Cainville Wash Road Dispersed' AND f.name = '4x4 recommended')
   OR (s.name = 'Chute Canyon TH Dispersed' AND f.name = 'Trailhead')
   OR (s.name = 'Glenwood Open OHV Area' AND f.name = 'OHV area')
   OR (s.name = 'Otter Creek Reservoir East Side Dispersed 1' AND f.name = 'Lakeshore')
   OR (s.name = 'Parowan Gap' AND f.name = 'Petroglyph site nearby');

COMMIT;
