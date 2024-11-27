export const TRIGGER_INSERT_FOLLOW = `CREATE OR REPLACE FUNCTION add_target_id_to_followings()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM follow_links WHERE user_id = NEW.userId) THEN
        -- Nếu user_id tồn tại, thêm target_id mới vào mảng followings
        UPDATE follow_links
        SET followings = followings || NEW.target_id
        WHERE user_id = NEW.user_id;
    ELSE
        -- Nếu user_id chưa tồn tại, tạo mới với mảng followings chứa target_id
        INSERT INTO follow_links (user_id, followers, followings)
        VALUES (NEW.user_id, '[]'::jsonb, jsonb_build_array(NEW.target_id));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_follow
            AFTER INSERT ON follows
FOR EACH ROW
EXECUTE FUNCTION add_target_id_to_followings();`;
