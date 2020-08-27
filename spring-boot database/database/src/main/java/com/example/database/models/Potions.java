package com.example.database.models;

import org.w3c.dom.Text;

import javax.persistence.*;

@Entity
@Table(name = "Potions")

public class Potions {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

  @Column
  private String nameOfItem;

  @Column
  private String type;

  @Column
  private String price;

  @Column
  private Text description;

  public Potions() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNameOfItem() {
    return nameOfItem;
  }

  public void setNameOfItem(String nameOfItem) {
    this.nameOfItem = nameOfItem;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public Text getDescription() {
    return description;
  }

  public void setDescription(Text description) {
    this.description = description;
  }
}
