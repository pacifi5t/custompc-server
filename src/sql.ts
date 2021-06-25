//Get user order list
export const sqlUserOrderList = `
SELECT orders.id, orders.status, orders.created_at
FROM users
LEFT JOIN orders ON users.id = orders.user_id 
WHERE users.id = :id
ORDER BY orders.updated_at DESC`;

export const sqlUserCart = `
SELECT carts.id
FROM users
LEFT JOIN carts on users.id=carts.user_id
WHERE users.id = :id`

//Get user's cart content
export const sqlUserCartAndContent = `
SELECT i.custom_build_id, i.company_build_id
FROM carts
LEFT JOIN users as u ON u.id=carts.user_id
LEFT JOIN items as i ON i.cart_id=carts.id
WHERE u.id = :id`;

//Order's content & status by id
export const sqlOrderContent = `
SELECT i.custom_build_id, i.company_build_id
FROM orders as o
LEFT JOIN items as i ON i.order_id=o.id
WHERE o.id = :id`;

//Info about custom build as item
export const sqlItemCustomBuildInfo = `
SELECT i.quantity, cb.price, cb.warranty
FROM items as i
INNER JOIN custom_builds as cb ON cb.id = i.custom_build_id
WHERE cb.id = :id`;

//Info about company build as item
export const sqlItemCompanyBuildInfo = `
SELECT i.quantity, cb.price, cb.warranty
FROM items as i
INNER JOIN company_builds as cb ON cb.id = i.company_build_id
WHERE cb.id = :id`;

//Get all custom builds
export const sqlAllCustomBuilds = `
SELECT users.username, cb.id, cb.price, cb.name, cb.tasks, cb.warranty, ratings.stars
FROM custom_builds as cb
LEFT JOIN users on users.id = cb.author_id
LEFT JOIN ratings on ratings.build_id = cb.id
WHERE cb.status = 'relevant'`;

//Get all company builds
export const sqlAllCompanyBuilds = `
SELECT cb.id, cb.price, cb.name, cb.tasks, cb.warranty
FROM comapny_builds as cb
LEFT JOIN tasks on tasks.build_id = cb.id
WHERE cb.status = 'relevant'`;

//Get all custom build parts
export const sqlCustomBuildParts = `
SELECT parts.*
FROM custom_builds as cb
LEFT JOIN custom_builds_parts as cbp ON cbp.custom_build_id = cb.id
LEFT JOIN parts ON parts.id = cbp.part_id
WHERE cb.id = :id`;

//Get all company build parts
export const sqlCompanyBuildParts = `
SELECT parts.*
FROM company_builds as cb
LEFT JOIN company_builds_parts as cbp ON cbp.company_build_id = cb.id
LEFT JOIN parts ON parts.id = cbp.part_id
WHERE cb.id = :id`

//Get all custom build software
export const sqlCustomBuildSoftware = `
SELECT s.*
FROM custom_builds as cb
LEFT JOIN custom_builds_software as cbs ON cbs.custom_build_id = cb.id
LEFT JOIN software as s ON s.id = cbs.software_id
WHERE cb.id = :id`

//Get all company build software
export const sqlCompanyBuildSoftware = `
SELECT s.*
FROM company_builds as cb
LEFT JOIN company_builds_software as cbs ON cbs.company_build_id = cb.id
LEFT JOIN software as s ON s.id = cbs.software_id
WHERE cb.id = :id`

//Update custom build ratings
export const sqlCalculateAvgRating = `
UPDATE custom_builds
SET custom_builds.average_rating = (
    SELECT AVG(ratings.stars) as avg_rating
    FROM ratings
    WHERE ratings.build_id = :id
)
WHERE custom_builds.id = :id`