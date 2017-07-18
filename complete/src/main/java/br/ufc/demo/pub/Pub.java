package br.ufc.demo.pub;

public class Pub {
	
	private Integer id;
	
	private String year;
	
	private String title;
	
	PubType type;
	
	private Integer authorId;
	
	private Integer publisherId;
	
	public Pub() {}
	
	public Pub(Integer id, String year, String title, PubType type,Integer authorId, Integer publisherId) {
		this.id = id;
		this.year = year;
		this.title = title;
		this.type = type;
		this.authorId = authorId;
		this.publisherId = publisherId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public PubType getType() {
		return type;
	}

	public void setType(PubType type) {
		this.type = type;
	}

	public Integer getAuthorId() {
		return authorId;
	}

	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}
	
	public Integer getPublisherId() {
		return publisherId;
	}

	public void setPublisherId(Integer publisherId) {
		this.publisherId = publisherId;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pub other = (Pub) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	

}
