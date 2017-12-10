class CreateComics < ActiveRecord::Migration[5.0]
  def change
    create_table :comics do |t|
      t.integer :marvel_id
      t.string :cover
      t.string :name
      t.boolean :favorite
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end