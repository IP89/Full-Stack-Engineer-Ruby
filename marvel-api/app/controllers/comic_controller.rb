class ComicController < ActionController::API
  def list
    page = params[:page]
    page = 1 if !page
    offset = Integer(page) * 15
    comics = Comic.offset(offset).limit(15).order(created_at: :desc)
    result = comics.map { |c| c.to_json }

    render json: result
  end

  def change
    render json: {} and return if !params[:marvel_id] || !params[:favorite]

    comic = Comic.find_by(marvel_id: params[:marvel_id])
    render json: {} and return if !comic

    comic.favorite = params[:favorite]
    comic.save

    render json: {}
  end

  def search
    page = params[:page]
    page = 1 if !page
    offset = Integer(page) * 15

    string = ActiveRecord::Base.connection.quote("%#{params[:search_string].downcase}%")

    characters = Character.where("LOWER(name) LIKE #{string}")
    comics = []
    ids = []

    characters.each do |c|
      character_comics = c.comic.order(created_at: :desc)
      character_comics.each do |comic|
        if !ids.include?(comic.id)
          ids << comic.id
          comics << comic.to_json
        end
      end
    end

    render json: comics[offset..(offset + 14)]
  end

  def get
    marvel_id = params[:marvel_id]
    if !marvel_id
      comic = Comic.first
    else
      comic = Comic.find_by(marvel_id: marvel_id)
    end

    render json: {} and return if !comic
    render json: comic.to_json
  end
end