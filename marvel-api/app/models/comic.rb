class Comic < ActiveRecord::Base
  has_and_belongs_to_many :character

  def to_json
    {
      name: self.name,
      marvel_id: self.marvel_id,
      cover: self.cover,
      favorite: self.favorite
    }
  end
end