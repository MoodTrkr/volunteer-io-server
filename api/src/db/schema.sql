/* usage_data table */
CREATE TABLE IF NOT EXISTS usage_data_table (
    id SERIAL NOT NULL PRIMARY KEY,
    id_user TEXT NOT NULL,
    ts DATE NOT NULL,
    usage_data bytea NOT NULL,
    UNIQUE(id_user, ts)
);