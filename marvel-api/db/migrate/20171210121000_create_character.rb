class CreateCharacter < ActiveRecord::Migration[5.0]
  def change
    create_table :characters do |t|
      t.string :uri
      t.string :name
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end