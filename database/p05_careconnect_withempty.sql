-- =========================================
-- SIMPLE CARECONNECT DATABASE
-- =========================================

-- Clean rebuild
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

-- =========================================
-- USERS TABLE
-- =========================================
CREATE TABLE users (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  rid INT NOT NULL,

  email VARCHAR(100) NOT NULL UNIQUE,
  mobile VARCHAR(15) NOT NULL UNIQUE,

  password VARCHAR(255) NOT NULL, -- Auth service manages security
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

-- =========================================
-- BENEFICIARY
-- =========================================
CREATE TABLE beneficiary (
  beneficiary_id INT PRIMARY KEY,

  type VARCHAR(50) NOT NULL, -- Controlled by frontend
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

-- =========================================
-- ADMIN
-- =========================================
CREATE TABLE admin (
  admin_id INT PRIMARY KEY,

  name VARCHAR(50) NOT NULL,
  admin_role VARCHAR(50) NOT NULL, -- Controlled by frontend

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_admin_user 
    FOREIGN KEY (admin_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================
-- REQUESTS
-- =========================================
CREATE TABLE requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,

  beneficiary_id INT NOT NULL,

  request_type VARCHAR(50) NOT NULL, -- Controlled by frontend
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

-- =========================================
-- VERIFICATION LOG
-- =========================================
CREATE TABLE verification_log (
  log_id INT AUTO_INCREMENT PRIMARY KEY,

  entity_type VARCHAR(50) NOT NULL, -- Controlled by frontend
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

-- =========================================
-- DOCUMENTS
-- =========================================
CREATE TABLE documents (
  doc_id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,
  file_url VARCHAR(255) NOT NULL,

  doc_type VARCHAR(50) NOT NULL, -- Controlled by frontend
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_doc_user (user_id),

  CONSTRAINT fk_doc_user 
    FOREIGN KEY (user_id) REFERENCES users(uid)
    ON DELETE CASCADE
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
