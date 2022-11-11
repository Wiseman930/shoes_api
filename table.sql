create table brands(
    id serial not null primary key,
    brand text not null
);

create table colors(
    id serial not null primary key,
    color text not null
);

create table sizes(
    id serial not null primary key,
    size text not null
);

create table stockimages(
    id serial not null primary key,
    image text not null
);

create table stock(
    id serial not null primary key,
    brand_id int not null,
    color_id int not null,
    size_id int not null,
    price int not null,
    quantity int not null,
    image_id int not null,
    foreign key (brand_id) references brands(id),
    foreign key (color_id) references colors(id),
    foreign key (size_id) references sizes(id),
    foreign key (image_id) references stockimages(id)
);

create table cart(
    id serial not null primary key,
    brand int not null,
    color int not null,
    size int not null,
    price int not null,
    quantity int not null,
	stock_id int,
    cart_image int not null,
	foreign key (stock_id) references stock(id)
);


insert into brands (id, brand) values (1, 'tago');
insert into brands (id, brand) values (2, 'bellito');
insert into brands (id, brand) values (3, 'afani');
insert into brands (id, brand) values (4, 'seruto');

insert into colors (id, color) values (1, 'black');
insert into colors (id, color) values (2, 'brown');
insert into colors (id, color) values (3, 'blue');
insert into colors (id, color) values (4, 'grey');
insert into colors (id, color) values (5, 'white');

insert into sizes (id, size) values (1, 5);
insert into sizes (id, size) values (2, 6);
insert into sizes (id, size) values (3, 7);
insert into sizes (id, size) values (4, 8);
insert into sizes (id, size) values (5, 9);


insert into stockimages (id, image) values (1, 'https://github.com/Wiseman930/shoes_api/blob/master/images/black.jpg?raw=true');
insert into stockimages (id, image) values (2, 'https://github.com/Wiseman930/shoes_api/blob/master/images/brown.jpg?raw=true');
insert into stockimages (id, image) values (3, 'https://github.com/Wiseman930/shoes_api/blob/master/images/blue.jpg?raw=true');
insert into stockimages (id, image) values (4, 'https://github.com/Wiseman930/shoes_api/blob/master/images/grey.jpg?raw=true');
insert into stockimages (id, image) values (5, 'https://github.com/Wiseman930/shoes_api/blob/master/images/white.jpg?raw=true');

