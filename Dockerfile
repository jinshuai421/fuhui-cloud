FROM hub.ztesa.work/library/busybox:1.35.0

MAINTAINER lilx <lilx@ztesa.com.cn>

ADD fuhui-cloud /home/fuhui-cloud

RUN mkdir -p /usr/share/nginx/html

CMD ["cp", "-rp", "/home/fuhui-cloud", "/usr/share/nginx/html"]