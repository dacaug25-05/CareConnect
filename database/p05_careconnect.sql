-- =========================================
-- CARECONNECT DATABASE (SIMPLE + PROD-LIKE DATA)
-- =========================================

DROP DATABASE IF EXISTS p05_careconnect;
CREATE DATABASE p05_careconnect;
USE p05_careconnect;

SET FOREIGN_KEY_CHECKS = 0;

-- =========================================
-- ROLE TABLE
-- =========================================
CREATE TABLE role (
  rid INT AUTO_INCREMENT PRIMARY KEY,
  rname ENUM('INDIVIDUAL_DONOR','ORGANIZATION_DONOR','BENEFICIARY','ADMIN') NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO role (rname) VALUES
('INDIVIDUAL_DONOR'),
('ORGANIZATION_DONOR'),
('BENEFICIARY'),
('ADMIN');

-- =========================================
-- USERS TABLE
-- =========================================
CREATE TABLE users (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  rid INT NOT NULL,

  email VARCHAR(100) NOT NULL UNIQUE,
  mobile VARCHAR(15) NOT NULL UNIQUE,

  password VARCHAR(255) NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user_role (rid),
  INDEX idx_user_email (email),

  CONSTRAINT fk_users_role 
    FOREIGN KEY (rid) REFERENCES role(rid)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO users (rid, email, mobile, password, approved) VALUES
(1, 'rahul.donor@gmail.com',   '9000000001', 'pwd123', TRUE),
(2, 'helpinghands@ngo.org',   '9000000002', 'pwd123', TRUE),
(3, 'cityhospital@health.in','9000000003', 'pwd123', FALSE),
(4, 'admin@careconnect.com', '9000000004', 'admin123', TRUE);

-- =========================================
-- INDIVIDUAL DONOR
-- =========================================
CREATE TABLE individual_donor (
  donor_id INT PRIMARY KEY,

  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,

  address_line VARCHAR(150),
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  pincode VARCHAR(10) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_ind_user 
    FOREIGN KEY (donor_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO individual_donor VALUES
(1, 'Rahul', 'Sharma', 'Flat 101, MG Road', 'Pune', 'Maharashtra', '411001', NOW()),
(2, 'Amit', 'Verma', 'Sector 12, Vashi', 'Navi Mumbai', 'Maharashtra', '400703', NOW()),
(3, 'Neha', 'Patil', 'College Road', 'Nashik', 'Maharashtra', '422005', NOW()),
(4, 'Riya', 'Joshi', 'Civil Lines', 'Nagpur', 'Maharashtra', '440001', NOW());

-- =========================================
-- ORGANIZATION DONOR
-- =========================================
CREATE TABLE organization_donor (
  org_id INT PRIMARY KEY,

  org_name VARCHAR(100) NOT NULL,
  org_type VARCHAR(50) NOT NULL,
  reg_no VARCHAR(50) UNIQUE,

  contact_person VARCHAR(50) NOT NULL,

  address_line VARCHAR(150),
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  pincode VARCHAR(10) NOT NULL,

  certificate_url VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_org_user 
    FOREIGN KEY (org_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO organization_donor VALUES
(2, 'Helping Hands Foundation', 'NGO', 'NGO-MH-001', 'Suresh Patil', 'Baner Road', 'Pune', 'Maharashtra', '411045', 'cert_helpinghands.pdf', NOW()),
(1, 'Serve India Trust', 'Trust', 'TR-MH-002', 'Anil Deshmukh', 'Itwari', 'Nagpur', 'Maharashtra', '440002', 'cert_serveindia.pdf', NOW()),
(3, 'Care for All Society', 'NGO', 'NGO-MH-003', 'Meena Shah', 'Andheri East', 'Mumbai', 'Maharashtra', '400069', 'cert_careforall.pdf', NOW()),
(4, 'Hope Charitable Org', 'Charity', 'CH-MH-004', 'Rohan Kulkarni', 'Gangapur Road', 'Nashik', 'Maharashtra', '422013', 'cert_hopeorg.pdf', NOW());

-- =========================================
-- BENEFICIARY
-- =========================================
CREATE TABLE beneficiary (
  beneficiary_id INT PRIMARY KEY,

  type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,

  reg_no VARCHAR(50) UNIQUE,
  contact_person VARCHAR(50) NOT NULL,

  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(100),

  address_line VARCHAR(150),
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  pincode VARCHAR(10) NOT NULL,

  certificate_url VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_ben_user 
    FOREIGN KEY (beneficiary_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO beneficiary VALUES
(3, 'HOSPITAL', 'City Care Hospital', 'BEN-MH-001', 'Dr. Mehta', '9111111111', 'contact@citycare.org', 'JM Road', 'Pune', 'Maharashtra', '411004', 'cert_citycare.pdf', TRUE, NOW(), NOW()),
(4, 'SCHOOL', 'Bright Future School', 'BEN-MH-002', 'Mr. Rao', '9222222222', 'info@brightfuture.edu', 'Andheri West', 'Mumbai', 'Maharashtra', '400058', 'cert_brightfuture.pdf', FALSE, NOW(), NOW()),
(1, 'NGO', 'Care Group Foundation', 'BEN-MH-003', 'Ms. Kale', '9333333333', 'support@caregroup.org', 'College Road', 'Nashik', 'Maharashtra', '422005', 'cert_caregroup.pdf', TRUE, NOW(), NOW()),
(2, 'TRUST', 'Helping Trust', 'BEN-MH-004', 'Mr. Jain', '9444444444', 'help@helpingtrust.in', 'Civil Lines', 'Nagpur', 'Maharashtra', '440001', 'cert_helpingtrust.pdf', FALSE, NOW(), NOW());

-- =========================================
-- ADMIN
-- =========================================
CREATE TABLE admin (
  admin_id INT PRIMARY KEY,

  name VARCHAR(50) NOT NULL,
  admin_role VARCHAR(50) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_admin_user 
    FOREIGN KEY (admin_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO admin VALUES
(4, 'System Admin', 'SUPER_ADMIN', NOW()),
(1, 'Admin Rahul', 'MODERATOR', NOW()),
(2, 'Admin Meena', 'VERIFIER', NOW()),
(3, 'Admin Support', 'SUPPORT', NOW());

-- =========================================
-- REQUESTS
-- =========================================
CREATE TABLE requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,

  beneficiary_id INT NOT NULL,

  request_type VARCHAR(50) NOT NULL,
  description TEXT,

  quantity INT CHECK (quantity > 0),

  status ENUM('OPEN','APPROVED','REJECTED','FULFILLED') DEFAULT 'OPEN',
  approved_by_admin BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_req_beneficiary (beneficiary_id),
  INDEX idx_req_status (status),

  CONSTRAINT fk_req_ben 
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiary(beneficiary_id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO requests (beneficiary_id, request_type, description, quantity, status, approved_by_admin) VALUES
(3, 'FOOD', 'Dry ration kits for patients', 100, 'APPROVED', TRUE),
(4, 'BOOKS', 'School books for grade 5 students', 60, 'OPEN', FALSE),
(1, 'CLOTHES', 'Winter clothes for homeless', 150, 'APPROVED', TRUE),
(2, 'MEDICINE', 'Basic medical supplies', 40, 'OPEN', FALSE);

-- =========================================
-- DONATIONS
-- =========================================
CREATE TABLE donations (
  donation_id INT AUTO_INCREMENT PRIMARY KEY,

  request_id INT NOT NULL,
  donor_id INT NOT NULL,

  donation_type VARCHAR(50) NOT NULL,
  quantity INT CHECK (quantity > 0),

  is_anonymous BOOLEAN DEFAULT FALSE,
  status ENUM('INITIATED','COMPLETED','CANCELLED') DEFAULT 'INITIATED',

  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_don_request (request_id),
  INDEX idx_don_donor (donor_id),

  CONSTRAINT fk_don_req 
    FOREIGN KEY (request_id) REFERENCES requests(request_id)
    ON DELETE RESTRICT,

  CONSTRAINT fk_don_user 
    FOREIGN KEY (donor_id) REFERENCES users(uid)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO donations (request_id, donor_id, donation_type, quantity, is_anonymous, status) VALUES
(1, 1, 'Food Packets', 20, FALSE, 'COMPLETED'),
(2, 2, 'Text Books', 30, TRUE, 'INITIATED'),
(3, 1, 'Jackets', 50, FALSE, 'COMPLETED'),
(4, 2, 'Medical Kits', 15, FALSE, 'INITIATED');

-- =========================================
-- VERIFICATION LOG
-- =========================================
CREATE TABLE verification_log (
  log_id INT AUTO_INCREMENT PRIMARY KEY,

  entity_type VARCHAR(50) NOT NULL,
  entity_id INT NOT NULL,

  status ENUM('PENDING','VERIFIED','REJECTED') NOT NULL,

  verified_by INT NOT NULL,
  verified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_status (status),

  CONSTRAINT fk_vlog_admin 
    FOREIGN KEY (verified_by) REFERENCES users(uid)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

INSERT INTO verification_log (entity_type, entity_id, status, verified_by) VALUES
('BENEFICIARY', 3, 'VERIFIED', 4),
('BENEFICIARY', 4, 'PENDING', 2),
('REQUEST', 1, 'VERIFIED', 1),
('DONOR', 2, 'VERIFIED', 4);

-- =========================================
-- DOCUMENTS
-- =========================================
CREATE TABLE documents (
  doc_id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,
  file_url VARCHAR(255) NOT NULL,

  doc_type VARCHAR(50) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_doc_user (user_id),

  CONSTRAINT fk_doc_user 
    FOREIGN KEY (user_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO documents (user_id, file_url, doc_type) VALUES
(1, 'donor_rahul_id.pdf', 'ID_PROOF'),
(2, 'helpinghands_cert.pdf', 'CERTIFICATE'),
(3, 'citycare_reg.pdf', 'REGISTRATION'),
(4, 'admin_id.pdf', 'ID_PROOF');

SET FOREIGN_KEY_CHECKS = 1;
