package com.ems.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ems.common.utils.BaseEntity;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * @program: ems-admin-boot
 * @description: this is a class
 * @author: starao
 * @create: 2021-11-27 13:25
 **/
@Setter
@Getter
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "sys_menu")
public class SysMenu extends BaseEntity implements Serializable {

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 名称
     */
    private String name;

    /**
     * 父ID
     */
    private Long parentId;

    /**
     * url
     */
    private String path;

    /**
     * 类型（1菜单 2页面 3按钮）
     */
    private String type;

    /**
     * 排序
     */
    private Integer sort;

    /**
     * 组件
     */
    private String component;

    /**
     * 权限标识
     */
    private String permission;

    /**
     * 图标
     */
    private String icon;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

}
