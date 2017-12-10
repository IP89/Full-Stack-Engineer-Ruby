class CreateJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_join_table :characters, :comics do |t|
      t.index [:comic_id, :character_id]
    end
  end
end