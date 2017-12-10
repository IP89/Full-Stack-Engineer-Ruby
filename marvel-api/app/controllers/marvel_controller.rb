class MarvelController < ActionController::API
  include MarvelHelper, CharacterHelper

  def update_db
    last_comic = Comic.last

    if !last_comic
      comics = MarvelHelper::fetch_all_comics
    else
      comics = MarvelHelper::fetch_comics_since_date(last_comic.created_at.strftime("%Y-%m-%d"))
    end

    comics.each do |comic|
      c = Comic.new
      next if Comic.find_by(marvel_id: comic[:id])
      c.marvel_id = comic[:id]
      c.name = comic[:title]

      next if comic[:images].count == 0

      image = comic[:images][0]
      c.cover = "#{image[:path]}/#{MARVEL_IMAGE_FORMAT}.#{image[:extension]}"

      comic[:characters][:items].each do |item|
        character = CharacterHelper::buildCharacter(item)
        c.character << character
      end

      c.favorite = false
      c.save
    end

    render json: {}
  end
end