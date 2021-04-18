export const sqlUserInfoAndOrderList = `
SELECT username, email, role, orders.id 
FROM users 
LEFT JOIN orders ON users.id = orders.user_id 
WHERE users.id = :id
ORDER BY orders.updated_at DESC`;

export const sqlUserCartAndContent = `
SELECT users.id as user_id, carts.id as cart_id, items.id as item_id
FROM carts
LEFT JOIN users ON users.id=carts.user_id
LEFT JOIN items ON items.cart_id=carts.id
WHERE users.id = :id`;

export const sqlOrderContent = `
SELECT orders.id as order_id, items.id as item_id
FROM orders
LEFT JOIN items ON items.cart_id=orders.id
WHERE orders.id = :id`;

export const sqlItemCustomBuildInfo = `
SELECT i.quantity, cb.price, cb.warranty, cb.image
FROM items as i
INNER JOIN custom_builds as cb ON cb.id = i.custom_build_id
WHERE i.id = :id`;

export const sqlItemCompanyBuildInfo = `
SELECT i.quantity, cb.price, cb.warranty, cb.image
FROM items as i
INNER JOIN company_builds as cb ON cb.id = i.company_build_id
WHERE i.id = :id`;

export const sqlCustomBuildInfo = `
SELECT users.username, cb.*, ratings.*
FROM custom_builds as cb
LEFT JOIN users on users.id = cb.author_id
LEFT JOIN ratings on ratings.build_id = cb.id
WHERE cb.id = :id`;

export const sqlCompanyBuildInfo = `
SELECT cb.*, tasks.name
FROM comapny_builds as cb
LEFT JOIN tasks on tasks.build_id = cb.id
WHERE cb.id = :id`;

export const sqlCustomBuildParts = `
SELECT cb.*, parts.*
FROM custom_builds as cb
LEFT JOIN custom_builds_parts as cbp ON cbp.custom_build_id = cb.id
LEFT JOIN parts ON parts.id = cbp.part_id
WHERE cb.id = :id`;

export const sqlCompanyBuildParts = `
SELECT cb.*, parts.*
FROM company_builds as cb
LEFT JOIN company_builds_parts as cbp ON cbp.company_build_id = cb.id
LEFT JOIN parts ON parts.id = cbp.part_id
WHERE cb.id = :id`

export const sqlCustomBuildSoftware = `
SELECT cb.*, s.*
FROM custom_builds as cb
LEFT JOIN custom_builds_software as cbs ON cbs.custom_build_id = cb.id
LEFT JOIN software as s ON s.id = cbs.software_id
WHERE cb.id = :id`

export const sqlCompanyBuildSoftware = `
SELECT cb.*, s.*
FROM company_builds as cb
LEFT JOIN company_builds_software as cbs ON cbs.company_build_id = cb.id
LEFT JOIN software as s ON s.id = cbs.software_id
WHERE cb.id = :id`

export const sqlCustomBuildFullInfo = `
SELECT cb.*, parts.*, s.*
FROM custom_builds as cb
LEFT JOIN custom_builds_parts as cbp ON cbp.custom_build_id = cb.id
LEFT JOIN parts ON parts.id = cbp.part_id
LEFT JOIN custom_builds_software as cbs ON cbs.custom_build_id = cb.id
LEFT JOIN software as s ON s.id = cbs.software_id
WHERE cb.id = :id`

export const sqlCompanyBuildFullInfo = `
SELECT cb.*, parts.*, s.*
FROM company_builds as cb
LEFT JOIN company_builds_parts as cbp ON cbp.company_build_id = cb.id
LEFT JOIN parts ON parts.id = cbp.part_id
LEFT JOIN company_builds_software as cbs ON cbs.company_build_id = cb.id
LEFT JOIN software as s ON s.id = cbs.software_id
WHERE cb.id = :id`

export const sqlCalculateAvgRating = `
UPDATE custom_builds
SET custom_builds.average_rating = (
    SELECT AVG(ratings.stars) as avg_rating
    FROM ratings
    WHERE ratings.build_id = :id
)
WHERE custom_builds.id = :id`